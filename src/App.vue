<template>
  <div id="canvas-wraper">
    <canvas id="deadzone-canvas"></canvas>
    <canvas id="ball-canvas" @click="jumpBall"></canvas>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        previousXVelocity: null,
      }
    },
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
                this.$store.dispatch('clearRectangle')
                this.$store.dispatch('calculateBallCoordinates')
                this.$store.dispatch('displayCircle');

                // display deadzones
                if (this.previousXVelocity && this.$store.getters['velocityX'] != this.previousXVelocity){
                  this.$store.dispatch('newDeadZones');
                }
                this.previousXVelocity = this.$store.getters['velocityX']
              }else{
                // this.resetGame()
                this.$store.dispatch('resetCanvas');
                this.$store.dispatch('resetDeadZoneCtx');
                this.$store.dispatch('displayCircle');
                // reset previous velocity
                this.previousXVelocity = this.$store.getters['velocityX']
            }
      },
    },
    mounted(){
      // this.setCanvasSize();
      this.$store.dispatch('setCanvasSize');
      // this.setInitialProperties();
      this.$store.dispatch('setInitialProperties');
      const canvasSize = this.$store.getters['getCanvasSize']

      const canvasWraper = document.getElementById("canvas-wraper");
      canvasWraper.style.width = canvasSize.width + 'px';
      canvasWraper.style.height = canvasSize.height + 'px';
      
      const ballCanvas = document.getElementById("ball-canvas");
      ballCanvas.width = canvasSize.width;
      ballCanvas.height = canvasSize.height;

      const deadZoneCanvas = document.getElementById("deadzone-canvas");
      deadZoneCanvas.width = canvasSize.width;
      deadZoneCanvas.height = canvasSize.height;
      
      const deadZoneCtx = deadZoneCanvas.getContext('2d');
      deadZoneCtx.lineWidth = 1;
      deadZoneCtx.shadowBlur = 20;
      deadZoneCtx.strokeStyle = '#cb0000'
      deadZoneCtx.fillStyle = '#ff5b5b'
      deadZoneCtx.shadowColor = "#e20000";
      this.$store.dispatch('setdeadZoneCtx', {ctx:deadZoneCtx});

      const ctx = ballCanvas.getContext("2d");
      ctx.fillStyle = '#e76f51';
      const circle = new Path2D();
      const ballCoordinates = this.$store.getters['getBallCoordinates'];
      circle.arc(ballCoordinates.currentX, ballCoordinates.currentY, ballCoordinates.radius, 0, 2 * Math.PI);
      ctx.fill(circle);
      this.$store.dispatch('setCtx', {ctx:ctx})
    }
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

