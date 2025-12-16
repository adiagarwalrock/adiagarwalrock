<template>
  <div id="app-container">
    <RouterView />
  </div>
</template>

<style>
body {
  background-image: url('./assets/wallpaper.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
}

#app-container {
  height: 100%;
  width: 100%;
}
</style>