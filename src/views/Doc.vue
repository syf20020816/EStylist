<template>
  <div :id="buildView(component)">
    <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.intro)">
        <Introduction></Introduction>
      </el-tab-pane>
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.prepare)">
        <Preparation></Preparation>
      </el-tab-pane>
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.use)">
        <HowToUse></HowToUse>
      </el-tab-pane>
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.example)">
        <Example></Example>
      </el-tab-pane>
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.update)">
        <Update></Update>
      </el-tab-pane>
      <el-tab-pane :label="getStr(store.settings.language,pagei18n.doc.contribute)">
        <div></div>
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
import Update from '../components/docs/Update.vue'

const component = 'Doc'
const store = indexStore()
</script>

<style lang="scss" scoped>
@use '../styles/views/Doc.scss';
</style>