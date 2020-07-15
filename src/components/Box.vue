<template>
  <div :class='[{boxClass:boxClass},"count-box"]'>
    <div class="title">{{title}}</div>
    <div class="count">
      <countTo
        :startVal="0"
        :endVal="val"
        :duration="1500"
        :decimals='decimals||0'
        :separator='separator||""'
      >
      </countTo>
      <span
        class='unit'
        v-if='unit'
      >{{unit}}</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import countTo from "vue-count-to"
export default {
  name: 'Box',
  components: {
    countTo
  },
  props: {
    title: String,
    val: Number,
    decimals: null,
    unit: null,
    separator: null,
    boxClass: null
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='scss'>
.count-box {
  .title {
    color: #fff;
    margin-bottom: 0.1rem;
    font-size: 0.2rem;
  }
  .count {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      color: #ffb000;
      font-size: 0.4rem;
    }
    .unit {
      font-size: 0.3rem;
    }
  }
}
</style>