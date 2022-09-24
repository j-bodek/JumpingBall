<template>
    <div class="howto-play-box">
        <h5 class="how-to-play-text">Tap / Press Space To Jump</h5>
    </div>
</template>

<style scoped>
.howto-play-box{
    position: absolute;
    width: 70%;
    height: fit-content;
    display:flex;
    left: 0; right: 0; top: 0; bottom: 0;
    transform: translateY(-60px);
    margin: auto;
}
.how-to-play-text{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
    margin: auto;
    font-size:16px;
    font-weight: 700;
    animation: fade-text 3s;
    animation-iteration-count: infinite;
}

@keyframes fade-text {
    25%   { opacity: 1}
    50%  { opacity: 0.5}
    75% { opacity: 1}
}
</style>