export default{
    isGameOver(state){
        // if collistion with horizontal dead zone
        if (state.currentY + state.radius >= state.canvasHeight ||
            state.currentY - state.radius <= 0){
          return true;
        }

        // if collision with vertical dead zone
        let gameOver = false;
        if (state.currentX === state.canvasWidth - state.radius || state.currentX === state.radius){
            state.deadZones.forEach(zone=>{
                if(zone.y <= state.currentY && state.currentY <= zone.y + zone.height){
                    gameOver = true;
                }
            })
        }

        return gameOver
    },  
    deadZones(state){
        return state.deadZones;
    },
    isPlaying(state){
        return state.isPlaying;
    },
    velocityX(state){
        return state.velocityX;
    },
    getCanvasSize(state){
        return {
            width: state.canvasWidth,
            height: state.canvasHeight
        }
    },
    getBallCoordinates(state){
        return{
            currentX: state.currentX,
            currentY: state.currentY,
            radius: state.radius,
        }
    }   
}