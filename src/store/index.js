import {createStore} from 'vuex';

// import modules
import GameModule from './modules/game/index.js';
// import BallModule from './modules/ball/index.js';

const store = createStore({
    modules:{
        gameModule: GameModule,
        // ballModule: BallModule,
    }
});

export default store;