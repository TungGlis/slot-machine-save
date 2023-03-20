<script setup lang="ts">
import { onMounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement>();

let isAppMounted = false;
let isGameModuleLoaded = false;
const progressNum = ref(0);
const isReadyToStart = ref(false);
/** a fake progress when game javascript is loaded */
const fakeCap = 0.1;


let GameModule: typeof import('@g/main');
import('@g/main').then((Game) => {
    if (isAppMounted) {
        onGameModuleLoaded(Game);
    }
    else {
        GameModule = Game;
    }
    isGameModuleLoaded = true;
});


onMounted(() => {
    if (isGameModuleLoaded) {
        onGameModuleLoaded(GameModule);
    }
    isAppMounted = true;
});


function onGameModuleLoaded(Game: typeof import('@g/main')) {
    progressNum.value = fakeCap;

    const vb = Game.vb;
    if (canvas.value === undefined) return;
    Game.prepareGame(canvas.value);

    const startGame = () => {
        if (vb.isMobile() && !vb.isApple()) {
            document.body.ontouchend = () => {
                if (!vb.isFullscreen()) vb.enterFullscreen();
            };
        }
        isReadyToStart.value = true;
    }

    globalThis.pgame.assets.onTotalProgress = (progress) => {
        progressNum.value = fakeCap + (1-fakeCap) * progress;
    }
    globalThis.pgame.onAssetsInitialized = () => {
        if (DEV)
            startGame();
        else
            setTimeout(startGame, 100);
    }
    window.addEventListener('resize', () => {
        globalThis.pgame.detectStyleAndResize(document.body.clientWidth, window.innerHeight-0.1);
    });
}
</script>

<template>
    <canvas id="game-canvas" v-show="isReadyToStart" ref="canvas"></canvas>
</template>

<style scoped>
#game-canvas {
  display: block;
}
</style>
