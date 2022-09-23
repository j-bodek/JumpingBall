<template>
    <transition name="fade-in">
        <slot></slot>
    </transition>
</template>

<style scoped>
    /* fade-in animation classes */
    .fade-in-enter-active{
      animation: fade-in 0.2s ease-in-out;
    }
    
    .fade-in-leave-active{
      /* use reverse to play animation in reverse */
      animation: fade-in 0.2s ease-in-out reverse;
    }
    
    /* fade-in animation */
    @keyframes fade-in{
      0%{opacity: 0;}
      100%{opacity:1;}
    }
    </style>