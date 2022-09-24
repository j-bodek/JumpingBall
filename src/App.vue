<template>
  <div class="body" v-bind:class="bodyColorClass">
    <div id="canvas-wraper" v-bind:class="gameColorClass">
      <the-game></the-game>
    </div>
  </div>
</template>

<script>
import TheGame from './pages/TheGame.vue';
export default{
  components:{
    'the-game':TheGame
  },
  computed:{
    bodyColorClass(){
      return this.$store.getters['getColor'].body;
    },
    gameColorClass(){
      return this.$store.getters['getColor'].game;
    }
  }
}
</script>

<style>
  @import url('http://fonts.cdnfonts.com/css/sf-mono');
  /* dark colors */
  .yellow{
    background-color:#DFAC2A;
    color: #F2DCA6;
  }
  .yellow-light{
    background-color:#F2DCA6;
    color: #DFAC2A;
  }
  .gray{
    background-color: #343A40;
    color: #C1DCEB;
  }
  .gray-light{
    background-color: #C1DCEB;
    color: #343A40;
  }
  .navy{
    background-color:#264653;
    color: #D5E5EC;
  }
  .navy-light{
    background-color:#D5E5EC;
    color:#264653;
  }
  .green{
    background-color:#1E7167;
    color: #BFEEE8;
  }
  .green-light{
    background-color: #BFEEE8;
    color: #1E7167;
  }

  /* body colors */
  .body-dark{
    background-color: #22292F;
    color: #C1DCEB;
  }
  .body-light{
    background-color: #E9ECEF;
    color: #22292F;
  }

  body{
    font-family: 'SF Mono', sans-serif;              
    margin:0;
    padding:0;
  }

  .body{
    width:100%;
    height:100vh;
    margin:0;
    padding:0;
    overflow:hidden;
  }

  #canvas-wraper{
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
  }
</style>

