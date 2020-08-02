<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #dbe4ed;
  height: 100vh;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
button:focus {
  outline: 0;
}

button {
  background-color: rgb(194, 163, 96);
  border-radius: 10px;
  border: solid 2px rgb(94, 63, 40);
  color: rgb(94, 63, 40);
  font-size: 20px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
