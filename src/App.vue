<template>
  <div id="app">
    <page></page>
  </div>
</template>
<script>
import page from './pages/page'
export default {
  data () {
    return {

    }
  },
  components: {
    page
  }
}
</script>
<style>
@import "./styles/common.scss";
#app {
  width: 100vw;
  height: 100vh;
  /* background: url("~@a/test.jpg") no-repeat; */
  background-size: 100% 100%;
  position: relative;
}
</style>