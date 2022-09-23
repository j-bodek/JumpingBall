export default{
    setCanvasSize(context){
        context.commit('setCanvasSize');
    },
    setInitialProperties(context, payload){
        context.commit('setInitialProperties', payload);
    },
    resetCanvas(context){
        context.commit('setInitialProperties')
        context.commit('clearRectangle')
    },
    clearRectangle(context){
        context.commit('clearRectangle');
    },
    resetDeadZoneCtx(context){
        context.commit('clearDeadZoneCtx');
    },
    startPlaying(context){
        context.commit('startPlaying');
    },
    setCtx(context, payload){
        context.commit('setCtx', {ctx:payload.ctx});
    },
    setdeadZoneCtx(context, payload){
        context.commit('setdeadZoneCtx', {ctx:payload.ctx});
    },
    newDeadZones(context){
        context.commit('newDeadZones');
    },
    calculateBallCoordinates(context){
        context.commit('updateFrameIter');
        context.commit('calculateBallTail');
        context.commit('calculateYProperty');
        context.commit('calculateXProperty');
    },
    resetBallTailCounter(context){
        context.commit('resetBallTailCounter');
    },
    resetVelocityY(context){
        context.commit('resetVelocityY')
    },
    displayCircle(context){
        context.commit('displayCircle');
    }
}