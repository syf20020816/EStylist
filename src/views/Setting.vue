<template>
  <div :id="buildView(component)">
    <div :class="build(component,'title')">Settings</div>
    <div :class="buildWrap(component,'content')">
      <div :class="build('content','item')">
        <div :class="build('item','title')">存储路径</div>
        <el-input v-model="settings.store" clearable></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">模板路径</div>
        <el-input v-model="settings.template" clearable></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">自动加载模板</div>
        <el-switch v-model="settings.auto" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">工作区占比</div>
        <el-select v-model="settings.proportion" class="m-2" placeholder="Select">
          <el-option v-for="item in Proportion" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
const component = 'Setting'

const Proportion = [
  {
    label: '1:1',
    value: '1:1'
  },
  {
    label: '2:3',
    value: '2:3'
  },
  {
    label: '3:2',
    value: '3:2'
  },
  {
    label: '6:4',
    value: '1:2'
  },
  {
    label: '4:6',
    value: '4:6'
  },
  {
    label: '13:7',
    value: '7:13'
  },
  {
    label: '7:13',
    value: '7:13'
  }
]

const settings = reactive({
  store: 'eStylist/store',
  template: '',
  auto: false,
  proportion: '13:7'
})
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'Setting';
@include buildView($component) {
  height: inherit;
  width: inherit;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  @include build($component, 'title') {
    margin: 2.5vh;
    font-size: 5vh;
    width: 100%;
    font-weight: 700;
    color: $bg-color-light;
    text-shadow: 1px 1px 2px $bg-color-light;
  }
  @include buildWrap($component, 'content') {
    width: 100%;
    height: 90vh;
    padding: 20px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    @include build('content', 'item') {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: flex-start;
      flex-wrap: nowrap;
      margin: 2vh 0;
      @include build('item', 'title') {
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        margin-right: 16px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        height: inherit;
      }
    }
  }
}
</style>