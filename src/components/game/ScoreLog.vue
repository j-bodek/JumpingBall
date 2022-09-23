<template>
    <div class="score-log">
        <h3>Best Score : {{$store.getters['bestGameScore']}}</h3>
        <h3>Games Played : {{$store.getters['gamesPlayed']}}</h3>
    </div>
</template>
<script>

</script>
<style scoped>
    .score-log{
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        margin: auto auto 1rem auto;
        width: 100%;
        height:fit-content;
        text-align: center;
    }
    .score-log h3{
        color: #C1DCEB;
        line-height: 1;
        margin:.5rem;
    }
</style>