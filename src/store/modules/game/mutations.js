export default{
    setInitialProperties(state){
        // general game state
        state.isPlaying = false;
        // ball properties 
        state.currentX = Math.floor(state.canvasWidth/2);
        state.currentY = Math.floor(state.canvasHeight/2);
        state.velocityX = state.canvasWidth/100;
        state.velocityY = -5;
        state.deadZones = [];
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

        // generate vertical dead zones
        state.deadZones.forEach(zone=>{
            state.deadZoneCtx.fillRect(deadZoneX-5, zone.y, deadZoneX-1, zone.height);
        })
        
        // generate horizontal dead zones
        state.deadZoneCtx.fillRect(1, 1, state.canvasWidth-1, 5);
        state.deadZoneCtx.fillRect(1, state.canvasHeight-5, state.canvasWidth-1, 5);
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
    calculateYProperty(state){
        state.velocityY += .2;
        state.currentY += state.velocityY;
    },
    calculateXProperty(state){
        // check if hit in side wall
        if (state.currentX >= state.canvasWidth - state.radius){
            state.velocityX = -Math.abs(state.velocityX);
            
        }else if(state.currentX <= state.radius){
            state.velocityX = Math.abs(state.velocityX);
        }
        
        // if playing on mobile phones currentX can be
        // float so to prevent setting currentX less the radius or more then
        // canvasWidth - radius use min and max function
        if(state.currentX + state.velocityX > state.canvasWidth - state.radius){
            state.currentX = state.canvasWidth - state.radius;
        }else if(state.currentX + state.velocityX < state.radius)
            state.currentX = state.radius;
        else{
            state.currentX += state.velocityX;
        }
    },
    displayCircle(state){
        const circle = new Path2D();
        circle.arc(state.currentX, state.currentY, state.radius, 0, 2 * Math.PI)
        state.ctx.fill(circle);
    },
    resetVelocityY(state){
        state.velocityY = -6;
    } 
}