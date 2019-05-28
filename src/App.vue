<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style lang="sass">
#app
    color: #2c3e50

#nav
    padding: 30px

    a
        color: #2c3e50
        font-weight: bold

        &.router-link-exact-active
            color: #42b983
</style>
