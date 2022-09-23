import counterMutations from './mutations.js';
import counterActions from './actions.js';
import counterGetters from './getters.js';

export default{
    state(){
        return{
            bestGameScore:0,
            gamesPlayed:0,
            counter:0,
          }
    },
    mutations:counterMutations,
    actions:counterActions,
    getters:counterGetters,
}