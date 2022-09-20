import gameMutations from './mutations.js';
import gameActions from './actions.js';
import gameGetters from './getters.js';

export default{
    state(){
        return{
            // general game state
            isPlaying:false,

            // canvas size
            canvasWidth:null,
            canvasHeight:null,
    
            // html elements
            ctx:null,

            // ball properties 
            currentX:null,
            currentY:null,
            radius:25,
            velocityX:null,
            velocityY:-5,
          }
    },
    mutations:gameMutations,
    actions:gameActions,
    getters:gameGetters,
}