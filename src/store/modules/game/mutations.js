export default{
    setInitialProperties(state, payload) {
        if (payload && payload.fps) state.fps = payload.fps;
        // general game state
        state.isPlaying = false;
        // ball properties 
        state.currentX = Math.floor(state.canvasWidth/2);
        state.currentY = Math.floor(state.canvasHeight/2);
        // velocityX should be enough for ball to move from one side to the other
        // in exactly (or very close) 1.5s
        state.moveTime = 1500; //1.5 s
        state.velocityX = (state.canvasWidth * 1000)/(state.moveTime*state.fps);
        state.gravity = ((state.canvasHeight/100 * 1000)/(state.fps))*(3/1000);
        state.velocityY = -5;
        state.deadZones = [];
        // init ball tail
        state.initBailCounter = 90 * (state.fps/60)
        state.ballTailCounter = 90 * (state.fps/60)
        // init ball crash particles
        state.ballParticles = []
        window.cancelAnimationFrame(state.crashAnimationId);
        state.crashIter = 0
        state.crashAnimationId = null
    },
    setCanvasSize(state){
        if(window.innerWidth > 500){
            state.canvasWidth = 500;
        }else{
            state.canvasWidth = window.innerWidth
        }

        if(window.innerHeight > 800){
            state.canvasHeight = 800;
        }else{
            state.canvasHeight = window.innerHeight
        }
    },
    clearRectangle(state){
        state.ctx.clearRect(0, 0, innerWidth, innerHeight);
    },
    startPlaying(state){
        state.isPlaying = true;
    },
    setCtx(state, payload){
        state.ctx = payload.ctx;
    },

    // deadZone
    setdeadZoneCtx(state, payload){
        state.deadZoneCtx = payload.ctx;
    },
    newDeadZones(state){
        this.commit("clearDeadZoneCtx");
        this.commit("generateDeadZones");
        this.commit("displayDeadZones");
    },
    clearDeadZoneCtx(state){
        state.deadZoneCtx.clearRect(0, 0, innerWidth, innerHeight);
    },
    displayDeadZones(state){
        // get wall on which dead zones should be displayed
        const deadZoneX = state.velocityX > 0 ? state.canvasWidth : 6;
        const object = this;
        // display deadzones animation
        let animation = function(){
            if(state.deadZonesAnimationIter < Math.floor(10/(60/state.fps))){
                object.commit("clearDeadZoneCtx");
                state.deadZones.forEach(zone=>{
                    state.deadZoneCtx.fillRect(deadZoneX-5, zone.y, deadZoneX-1, zone.height/(Math.floor(10/(60/state.fps))-state.deadZonesAnimationIter));
                })
                // generate horizontal dead zones
                state.deadZoneCtx.fillRect(1, 1, state.canvasWidth-1, 5);
                state.deadZoneCtx.fillRect(1, state.canvasHeight-5, state.canvasWidth-1, 5);
                state.deadZonesAnimationIter ++;
                window.requestAnimationFrame(animation);
            }else{
                state.deadZonesAnimationIter = 0;
            }
        }
        window.requestAnimationFrame(animation);
    },
    generateDeadZones(state){
        // get number of safe zones (number between 2 and 4)
        const safeZonesNum = Math.floor(Math.random() * 3) + 2
        const maxSafeZoneHeight = (state.canvasHeight - 5*2*state.radius)/(safeZonesNum+1);
        const minSafeZoneHeight = Math.min(2*state.radius + 20, maxSafeZoneHeight);
        
        let safeZonesArray = [];
        for(let i of Array(safeZonesNum).keys()){
            // get length of safe zones ( number between radius => 1/5(canvas-height - 5*radius))
            let safeZoneHeight = Math.floor(Math.random() * (maxSafeZoneHeight-minSafeZoneHeight-1))+minSafeZoneHeight;
            let safeZoneY = Math.floor(Math.random()*(state.canvasHeight+1-safeZoneHeight));
            if (safeZoneY <= minSafeZoneHeight){
                safeZoneY = 0;
            }else if(safeZoneY >= state.canvasHeight-minSafeZoneHeight-safeZoneHeight){
                safeZoneY = state.canvasHeight - safeZoneHeight;
            }
            safeZonesArray.push({
                y:safeZoneY,
                height:safeZoneHeight,
            })
        }

        // sort safeZonesArray by Y increasingly 
        safeZonesArray.sort((a,b) => a.y - b.y);
        let mergedZones = [];

        // merge safeZones
        safeZonesArray.forEach(zone=>{
            if (mergedZones.length == 0){
                mergedZones.push(zone)
            }else{
                let previousZone = mergedZones[mergedZones.length-1];
                let previousZoneEnd = previousZone.y + previousZone.height;
                if (zone.y - previousZoneEnd<minSafeZoneHeight){
                    mergedZones[mergedZones.length-1] = {
                        y:previousZone.y,
                        height:Math.max(zone.y+zone.height-previousZone.y, previousZone.height),
                    }
                }else{
                    mergedZones.push(zone);
                }
            }
        })

        // based on safeZones generate deadZones
        let deadZonesArray = [];
        for(let i = 0; i < mergedZones.length; i++){
            let curZone = mergedZones[i];
            let nextZone = mergedZones.length - 1 > i ? mergedZones[i+1]:null;
            if(curZone.y>minSafeZoneHeight && i == 0){
                deadZonesArray.push({
                    y:0,
                    height:curZone.y,
                })
            }
            if(!nextZone && state.canvasHeight-(curZone.y+curZone.height)>minSafeZoneHeight){
                deadZonesArray.push({
                    y:curZone.y+curZone.height,
                    height:state.canvasHeight-(curZone.y+curZone.height),
                })
            }
            if(nextZone){
                deadZonesArray.push({
                    y:curZone.y+curZone.height,
                    height:nextZone.y-(curZone.y+curZone.height),
                })
            }
        }
        state.deadZones = deadZonesArray;
    },
    //  ball specific mutations
    calculateYProperty(state, payload){
        let obj = payload && payload.object ? payload.object : state
        let speed = payload && payload.speed ? payload.speed : 1
        // increase velocityY to create gravity effect
        // calculate increase rate so that after player jump 
        // velocityY will be equal 0 after 1/3s
        obj.velocityY += state.gravity * speed;
        // if fps greater or less then 60 make sure that currentY
        // is not updated to slow or too fast
        obj.currentY += obj.velocityY/(state.fps/60) * speed;
    },
    calculateXProperty(state, payload){
        let obj = payload && payload.object ? payload.object : state
        let speed = payload && payload.speed ? payload.speed : 1
        // check if hit in side wall
        if (obj.currentX >= state.canvasWidth - obj.radius){
            obj.velocityX = -Math.abs(obj.velocityX)*speed;
            
        }else if(obj.currentX <= obj.radius){
            obj.velocityX = Math.abs(obj.velocityX)*speed;
        }
        
        // if playing on mobile phones currentX can be
        // float so to prevent setting currentX less the radius or more then
        // canvasWidth - radius use min and max function
        if(obj.currentX + obj.velocityX > state.canvasWidth - obj.radius){
            obj.currentX = state.canvasWidth - obj.radius;
        }else if(obj.currentX + obj.velocityX < obj.radius)
            obj.currentX = obj.radius;
        else{
            obj.currentX += obj.velocityX*speed;
        }
    },
    updateFrameIter(state){
        state.frameIter ++;
    },
    resetBallTailCounter(state){
        state.ballTailCounter = state.initBailCounter;
        state.ballTail = [];
    },
    calculateBallTail(state){
        if (state.ballTail.length < 6 && state.frameIter%(5*state.fps/60)==0){
            state.ballTail.unshift({x:state.currentX, y:state.currentY})
            state.frameIter = 0;
        }
    },
    displayCircle(state){
        const circle = new Path2D();
        circle.arc(state.currentX, state.currentY, state.radius, 0, 2 * Math.PI)
        state.ctx.fill(circle);
        // display tail
        if(state.ballTailCounter > 0){
            state.ballTail.forEach(function(e, i){
                let part = new Path2D();
                let dynamicDivider = 1;
                if (state.ballTailCounter <= 2*(Math.round(state.initBailCounter/3))){
                    dynamicDivider = ((2*(Math.round(state.initBailCounter/3))+2) - state.ballTailCounter)/2;
                }
                part.arc(e.x, e.y, state.radius/((i+1)*2*dynamicDivider), 0, 2 * Math.PI)
                state.ctx.fill(part);
            })
            state.ballTailCounter = Math.max(0, state.ballTailCounter-1);
        }
    },
    resetVelocityY(state){
        // after user player jump
        state.velocityY = -state.canvasHeight/100;
    },

    // ball crash animation
    ballCrashAnimation(state){
        for (let i = 0; i < 40; i++) {
            let absVelocityX = (state.canvasWidth * 1000)/(state.moveTime*state.fps);
            let velocityX = state.currentX === state.radius ? absVelocityX : -absVelocityX 
            let obj = {
                currentX:state.currentX, 
                currentY:state.currentY, 
                velocityX:Math.round(Math.random() * velocityX*2)+2,
                velocityY:-Math.round(Math.random() * 15)
            };
            state.ballParticles.push(obj);
        }

        let obj = this;
        let animate = function(){
            obj.commit('clearRectangle');

            let speed = 1;
            if (state.crashIter < 25*(state.fps/60)){
                speed = .2;
                state.crashIter ++;
            }

            state.ballParticles.forEach(particle=>{
                let part = new Path2D();
                part.arc(particle.currentX, particle.currentY, 8, 0, 2 * Math.PI)
                state.ctx.fill(part);
                obj.commit('calculateYProperty', {object:particle, speed:speed});
                obj.commit('calculateXProperty', {object:particle, speed:speed});
            })
            state.crashAnimationId = window.requestAnimationFrame(animate)
        }
        state.crashAnimationId = window.requestAnimationFrame(animate)
    }
}