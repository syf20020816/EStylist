<template>
  <div :id="buildView(component)"></div>
</template>

<script lang="ts">
export default {
  name: 'MailSend'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
const component = 'MailSend'
</script>

<style lang="scss" scoped>
</style>