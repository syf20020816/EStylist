<template>
  <div :id="buildView(component)">
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.width) }}</div>
      <el-input-number v-model="store.currentMailModel.base.width" :step="10" :max="800" />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
      <el-color-picker v-model="store.currentMailModel.base.bgColor" />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
      <el-input-number v-model="store.currentMailModel.base.padding" :step="2" :max="100" />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
      <el-input-number v-model="store.currentMailModel.base.areaNum" :step="1" :max="20" />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
      <el-select v-model="store.currentMailModel.base.direction" placeholder="Select Direction">
        <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
      <el-button type="success" round>{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditBasePlate'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../../styles/name'
import { pagei18n, getStr, Direction } from '../../core'
import { indexStore } from '../../store/IndexPinia'
const component = 'EditBasePlate'
const store = indexStore()
</script>

<style lang="scss" scoped>
@use '../../styles/name.scss' as *;
@use '../../styles/src/var.scss' as *;

$component: 'EditBasePlate';
@include buildView($component) {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  @include build('template', 'base') {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    margin: 0.5vh 0;

    .tmptitle {
      white-space: nowrap;
      margin-right: 16px;
      font-size: 13px;
    }
    .wrapline {
      width: 100%;
      margin: 0.5vh 0;
      .el-input-number {
        margin-left: 16px;
      }
    }
  }
}
</style>