export default{
    isGameOver(state){
        if (state.currentY + state.radius >= state.canvasHeight ||
            state.currentY - state.radius <= 0){
          return true;
        }else{
          return false;
        }
    },  
    isPlaying(state){
        return state.isPlaying;
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