<template>
  <div :id="buildView(component)">
    <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
      <el-tab-pane label="Introduction">
        <Introduction></Introduction>
      </el-tab-pane>
      <el-tab-pane label="Preparation">
        <Preparation></Preparation>
      </el-tab-pane>
      <el-tab-pane label="How To Use">
        <HowToUse></HowToUse>
      </el-tab-pane>
      <el-tab-pane label="Example">
        <Example></Example>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import Preparation from '../components/docs/Preparation.vue'
import Introduction from '../components/docs/Introduction.vue'
import HowToUse from '../components/docs/HowToUse.vue'
import Example from '../components/docs/Example.vue'

const component = 'Doc'
const store = indexStore()
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'Doc';

@include buildView($component) {
  height: 100%;
  width: 100%;
}
</style>