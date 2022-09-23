export default{
    resetCounter(context){
        context.commit('updateBestScore');
        context.commit('updateGamesPlayed');
        context.commit('setInitialCounter');
    },
    IncrementCounter(context){
        context.commit('IncrementCounter');
    }, 
    loadBestScoreAndGamesPlayed(context){
        context.commit('loadBestScoreAndGamesPlayed');
    }
}