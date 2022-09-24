export default{
    setInitialCounter(state){
        state.counter = 0;
        state.colorIndex = 0;
    },
    loadBestScoreAndGamesPlayed(state){
        if(!isNaN(localStorage.getItem('gamesPlayed'))){
            state.gamesPlayed = Number(localStorage.getItem('gamesPlayed'));
        }
        if(!isNaN(localStorage.getItem('bestGameScore'))){
            state.bestGameScore = Number(localStorage.getItem('bestGameScore'));
        }
    },
    updateColor(state){
        if(state.counter % 10 === 0){
            state.colorIndex = state.colorIndex + 1 < state.colors.length ? state.colorIndex + 1 : 0;
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