<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :class="buildWrap('left','top')">
        <span>模板超市</span>
        <el-input v-model="searchInput" placeholder="Please input" class="input-with-select">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <div :class="buildWrap('left','mid')">

      </div>
      <div :class="buildWrap('left','bottom')">

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
import { Search } from '@element-plus/icons-vue'
const component = 'TemplateLib'

let searchInput = ref('')
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
    @include buildWrap('left', 'top') {
    }
    @include buildWrap('left', 'mid') {
    }
    @include buildWrap('left', 'bottom') {
    }
  }
  @include buildWrap($component, 'right') {
    width: 60%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;

    @include buildWrap('right', 'title') {
    }
    @include buildWrap('right', 'preview') {
    }
  }
}
</style>