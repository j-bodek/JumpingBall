export default{
    setCanvasSize(context){
        context.commit('setCanvasSize');
    },
    setInitialProperties(context){
        context.commit('setInitialProperties');
    },
    resetCanvas(context){
        context.commit('setInitialProperties')
        context.commit('clearRectangle')
    },
    clearRectangle(context){
        context.commit('clearRectangle');
    },
    startPlaying(context){
        context.commit('startPlaying');
    },
    setCtx(context, payload){
        context.commit('setCtx', {ctx:payload.ctx});
    },
    calculateBallCoordinates(context){
        context.commit('calculateYProperty');
        context.commit('calculateXProperty');
    },
    resetVelocityY(context){
        context.commit('resetVelocityY')
    },
    displayCircle(context){
        context.commit('displayCircle');
    }
}