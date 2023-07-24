<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'tool1')">
      <div :class="buildWrap(component,'color')">
        <div :class="build('color','main')" :style="colors" @click="showColorPicker">
          <input ref="colorPickerRef" type="color" v-model="globalColor" name="" id="color-picker" style="display: none;">
        </div>
        <div class="details">
          <span>调色器</span>
          <el-tooltip placement="top">
            <template #content>
              调色器可以控制全局颜色以及组件颜色
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <el-input v-model="globalColor" placeholder="transparent" clearable></el-input>
        </div>
      </div>
    </div>
    <hr>
    <div :class="buildWrap(component,'tool2')">

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditTools'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { QuestionFilled } from '@element-plus/icons-vue'
const colorPickerRef = ref()
const component = 'EditTools'
let globalColor = ref('#dedeff')

let colors = computed(() => {
  let mainColor = globalColor.value
  let weakColor = '#ff' + mainColor.slice(3, mainColor.length)
  return 'background: linear-gradient(90deg,' + weakColor + ',' + mainColor + ',' + weakColor + ');'
})

const showColorPicker = () => {
  colorPickerRef.value.click()
}
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'EditTools';

@include buildView($component) {
  height: 100%;
  width: 100%;
  @include buildWrap($component, 'tool1') {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include buildWrap($component, 'color') {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .details {
        width: calc(100% - 120px);
        height: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .el-icon {
          margin: 0 10px;
          cursor: pointer;
        }
      }
      @include build('color', 'main') {
        cursor: pointer;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        box-shadow: 0 0 4px 2px #000;
      }
    }
  }
}
</style>