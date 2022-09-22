import {createStore} from 'vuex';

// import modules
import GameModule from './modules/game/index.js';
import CounterModule from './modules/counter/index.js';

const store = createStore({
    modules:{
        gameModule: GameModule,
        counterModule: CounterModule,
    }
});

export default store;