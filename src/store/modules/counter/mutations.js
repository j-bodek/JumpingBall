export default{
    setInitialCounter(state){
        state.counter = 0;
    },
    loadBestScoreAndGamesPlayed(state){
        if(!isNaN(localStorage.getItem('gamesPlayed'))){
            console.log(localStorage.getItem('gamesPlayed'));
            state.gamesPlayed = Number(localStorage.getItem('gamesPlayed'));
        }
        if(!isNaN(localStorage.getItem('bestGameScore'))){
            state.bestGameScore = Number(localStorage.getItem('bestGameScore'));
        }
    },
    IncrementCounter(state){
        state.counter += 1;
    },
    updateGamesPlayed(state){
        state.gamesPlayed ++;
        localStorage.setItem('gamesPlayed', state.gamesPlayed);
    },
    updateBestScore(state){
        if (state.counter > state.bestGameScore){
            state.bestGameScore = state.counter;
            localStorage.setItem('bestGameScore', state.bestGameScore);
        }
    }
}