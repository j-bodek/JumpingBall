import gameMutations from './mutations.js';
import gameActions from './actions.js';
import gameGetters from './getters.js';

export default{
    state(){
        return{
            // general game state
            isPlaying:false,
            // set 60 as initial fps number (to prevent dividing by zero)
            fps:60,
            // moveTime is time that take ball to travel from
            // one side to another
            moveTime:0,
            // canvas size
            canvasWidth:null,
            canvasHeight:null,
    
            // html elements
            ctx:null,

            // ball properties 
            currentX:null,
            currentY:null,
            radius:30,
            velocityX:null,
            velocityY:-5,
            gravity:.35,

            // dead zones
            deadZoneCtx:null,
            deadZones:[
                // {y, height}
            ]
          }
    },
    mutations:gameMutations,
    actions:gameActions,
    getters:gameGetters,
}