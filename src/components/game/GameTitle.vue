<template>
    <div class="title-box">
        <h1 class="title">Jumping Balls<span>●</span></h1>
    </div>
</template>

<style scoped>
.title-box{
    position: absolute;
    width: 70%;
    height: fit-content;
    display:flex;
    text-align: center;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: 3rem auto 0 auto;
}
.title{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
    margin: auto;
    font-size:50px;
    font-weight: 700;
}
.title span{
    margin-left:10px;
    position:absolute;
    padding:0;
    margin-top:3px;
    animation: jumpBall 1.5s ease;
    animation-iteration-count: infinite;
}

@keyframes jumpBall {
    0%   { transform: scale(1,1)    translateY(0); }
    10%  { transform: scale(1.1,.9) translateY(0); }
    30%  { transform: scale(.9,1.1) translateY(-25px); }
    50%  { transform: scale(1,1)    translateY(0); }
    57%  { transform: scale(1,1)    translateY(-7px); }
    64%  { transform: scale(1,1)    translateY(0); }
    100% { transform: scale(1,1)    translateY(0); }
}
</style>