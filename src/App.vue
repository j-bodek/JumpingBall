<template>
  <div id="canvas-wraper">
    <canvas id="canvas" @click="jumpBall"></canvas>
  </div>
</template>

<script>
  export default{
    methods:{
      jumpBall(){
        if(!this.$store.getters['isPlaying']){
          // this.isPlaying = true;
          this.$store.dispatch('startPlaying');
          this.runAnimation();
        }else{
          // this.velocityY = -6;
          this.$store.dispatch('resetVelocityY');
        }
      },
      runAnimation(){
            if(!this.$store.getters['isGameOver']){
                requestAnimationFrame(this.runAnimation);
                // this.ctx.clearRect(0, 0, innerWidth, innerHeight);
                this.$store.dispatch('clearRectangle')
                // this.calculateYProperty();
                // this.calculateXProperty();
                this.$store.dispatch('calculateBallCoordinates')
                // this.displayCircle();
                this.$store.dispatch('displayCircle');
              }else{
                // this.resetGame()
                this.$store.dispatch('resetCanvas');
                this.$store.dispatch('displayCircle');
            }
      },
    },
    mounted(){
      // this.setCanvasSize();
      this.$store.dispatch('setCanvasSize');
      console.log('ballCoordinates')
      // this.setInitialProperties();
      this.$store.dispatch('setInitialProperties');
      const canvasSize = this.$store.getters['getCanvasSize']

      const canvasWraper = document.getElementById("canvas-wraper");
      canvasWraper.style.width = canvasSize.width + 'px';
      canvasWraper.style.height = canvasSize.height + 'px';
      
      const canvas = document.getElementById("canvas");
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = '#e76f51';
      const circle = new Path2D();
      const ballCoordinates = this.$store.getters['getBallCoordinates'];
      circle.arc(ballCoordinates.currentX, ballCoordinates.currentY, ballCoordinates.radius, 0, 2 * Math.PI);
      // circle.arc(100, 100, 25, 0, 2 * Math.PI);
      ctx.fill(circle);
      this.$store.dispatch('setCtx', {ctx:ctx})
    }
  }
</script>

<style>
  body{
    margin:0;
    padding:0;
    background: #343A40;
  }
  #canvas{
    position: relative;
    cursor: pointer;
  }
  #canvas-wraper{
    background: #E9ECEF;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
  }
</style>

