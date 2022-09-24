import counterMutations from './mutations.js';
import counterActions from './actions.js';
import counterGetters from './getters.js';

export default{
    state(){
        return{
            bestGameScore:0,
            gamesPlayed:0,
            counter:0,
            colorIndex:0,
            colors:[
                // dark themes
                {body:'body-light', game:'gray', counter:'gray-light'},
                {body:'body-light', game:'navy', counter:'navy-light'},
                {body:'body-light', game:'green', counter:'green-light'},
                {body:'body-light', game:'yellow', counter:'yellow-light'},
                // light themes
                {body:'body-dark', counter:'gray', game:'gray-light'},
                {body:'body-dark', counter:'navy', game:'navy-light'},
                {body:'body-dark', counter:'green', game:'green-light'},
                {body:'body-dark', counter:'yellow', game:'yellow-light'},
            ]
          }
    },
    mutations:counterMutations,
    actions:counterActions,
    getters:counterGetters,
}