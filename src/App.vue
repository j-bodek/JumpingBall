<template>
  <div id="canvas-wraper">
    <the-game></the-game>
  </div>
</template>

<script>
import TheGame from './pages/TheGame.vue';
export default{
  components:{
    'the-game':TheGame
  },
}
</script>

<style>
  body{
    margin:0;
    padding:0;
    background: #E9ECEF;
  }
  #ball-canvas,
  #deadzone-canvas{
    position: absolute;
    cursor: pointer;
    left: 0; 
    top: 0; 
  }
  #deadzone-canvas{
    z-index: 0;
  }
  #ball-canvas{
    z-index: 1;
  }

  #canvas-wraper{
    background: #343A40;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
  }
</style>

