<template>
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'Outter'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>

<style lang="scss" scoped>
</style>