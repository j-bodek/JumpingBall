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
  @import url('http://fonts.cdnfonts.com/css/sf-mono');
  body{
    font-family: 'SF Mono', sans-serif;              
    margin:0;
    padding:0;
    background: #E9ECEF;
  }

  #canvas-wraper{
    background: #343A40;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
  }
</style>

