<template>
  <div class="dashboard">
    <aside class="sidebar">
      <ul>
        <li><router-link to="/">Tasks</router-link></li>
        <li><router-link to="/mytask">My Task</router-link></li>
      </ul>
    </aside>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.dashboard {
  display: grid;
  grid-template-areas: 
    "sidebar main";
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}
.sidebar {
  grid-area: sidebar;
  padding: 0;
}
.sidebar {
  background: var(--color-gray);
}
.sidebar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.sidebar ul > li > a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 12px 15px;
  text-align: left;
}
.sidebar ul > li > a.router-link-exact-active {
  background-color: var(--color-green);
}
.main {
  grid-area: main;
  padding: 15px;
}
</style>
