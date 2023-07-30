<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :class="buildWrap('left','top')">
        <el-input v-model="searchInput" placeholder="Please input" class="input-with-select">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <div :class="buildWrap('left','mid')">
        <div class="jsonBox" v-for="item,index in downloadList" :key="index">
          <el-tooltip effect="dark" content="json str" placement="top">
            <el-tag type="dark" class="tagName" effect="dark">
              json
            </el-tag>
          </el-tooltip>
          <img class="jsonImg" src="../assets/template.svg" alt="json">
          <el-button type="primary" size="small" :icon="View">预览</el-button>
          <el-button type="primary" size="small" :icon="Download">下载</el-button>
        </div>
      </div>
      <div :class="buildWrap('left','bottom')">
        <el-button type="primary" :icon="Download">选择下载源</el-button>
        <el-button type="primary" :icon="Refresh">刷新</el-button>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="buildWrap('right','title')">
        模板预览
      </div>
      <div :class="buildWrap('right','preview')">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TemplateLib'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { Search, Refresh, Download, View } from '@element-plus/icons-vue'
const component = 'TemplateLib'

let searchInput = ref('')

let downloadList = reactive([
  {
    name: 'example1',
    url: ''
  },
  {
    name: 'example2',
    url: ''
  },
  {
    name: 'example3',
    url: ''
  },
  {
    name: 'example4',
    url: ''
  },
  {
    name: 'example5',
    url: ''
  }
])
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'TemplateLib';

@include buildView($component) {
  height: inherit;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include buildWrap($component, 'left') {
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    background-color: $bg-color-dark-weak;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    @include buildWrap('left', 'top') {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: baseline;
      box-sizing: border-box;
    }
    @include buildWrap('left', 'mid') {
      background-color: $bg-color-dark;
      height: calc(100% - 120px);
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow-y: scroll;
      scrollbar-width: thin;
      align-content: baseline;
      .jsonBox {
        height: auto;
        width: 100px;
        box-sizing: border-box;
        padding: 8px;
        margin: 4px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .tagName {
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
        }
        .jsonImg {
          height: 60px;
          margin: 8px 0;
        }
        .el-button {
          margin: 4px auto;
        }
      }
    }
    @include buildWrap('left', 'bottom') {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  @include buildWrap($component, 'right') {
    width: 60%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;

    @include buildWrap('right', 'title') {
      display: flex;
      align-items: center;
      height: 36px;
      font-size: 18px;
      justify-content: flex-start;
    }
    @include buildWrap('right', 'preview') {
    }
  }
}
</style>