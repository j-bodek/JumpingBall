export default{
    setInitialProperties(state){
        // general game state
        state.isPlaying = false;
        // ball properties 
        state.currentX = Math.floor(state.canvasWidth/2);
        state.currentY = Math.floor(state.canvasHeight/2);
        state.velocityX = state.canvasWidth/100;
        state.velocityY = -5;
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

    //  ball specific mutations
    calculateYProperty(state){
        state.velocityY += .2;
        // console.log(this.velocityY)
        state.currentY += state.velocityY;
    },
    calculateXProperty(state){
        if (state.currentX + state.radius >= state.canvasWidth){
            state.velocityX = -Math.abs(state.velocityX);
        }else if(state.currentX - state.radius <= 0){
            state.velocityX = Math.abs(state.velocityX);
        }
        state.currentX += state.velocityX;
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