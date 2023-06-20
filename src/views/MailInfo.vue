<template>
  <div :id="buildView(component)">
    <div :class="build(component,'title')">EStylist</div>
    <div :class="buildWrap(component,'content')">
      <div :class="build('content','title')">
        {{ getStr(store.settings.language,pagei18n.info.what) }}
      </div>
      <div :class="build('content','des')">
        {{ getStr(store.settings.language,pagei18n.info.des) }}
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="version" label="Version" width="200" />
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="author" label="Author" />
      </el-table>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'MailInfo'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
const component = 'MailInfo'
const store = indexStore()

const tableData = [
  {
    date: '2023-07-01',
    version: '0.0.1',
    author: 'syf20020816@outlook.com'
  }
]
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'MailInfo';

@include buildView($component) {
  height: inherit;
  width: calc(100vw - 60px);
  text-align: left;
  color: $bg-color-light;

  @include build($component, 'title') {
    height: 6vh;
    font-size: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-shadow: 1px 0px 2px #fff;
    margin: 1.5vh 0;
  }
  @include buildWrap($component, 'content') {
    padding: 0 16px;

    @include build('content', 'title') {
      font-size: 3vh;
      font-weight: 700;
      margin: 1vh 0;
      box-sizing: border-box;
    }
    @include build('content', 'des') {
      font-size: 2.5vh;
      text-align: justify;
      margin: 1vh 1vw;
      box-sizing: border-box;
      line-height: 1.5em;
    }
  }
}
</style>