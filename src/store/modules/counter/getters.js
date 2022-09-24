export default{
    counter(state){
        if (String(state.counter).length == 1){
            return '0' + String(state.counter)
        }
        return state.counter
    },
    getColor(state){
        return state.colors[state.colorIndex]
    },
    bestGameScore(state){
        return state.bestGameScore;
    },
    gamesPlayed(state){
        return state.gamesPlayed;
    },
}