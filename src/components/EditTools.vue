<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'tool1')">
      <div :class="buildWrap(component,'color')">
        <div :class="build('color','main')" :style="colors" @click="showColorPicker">
          <input ref="colorPickerRef" type="color" v-model="globalColor" name="" id="color-picker" style="display: none;">
        </div>
        <div class="details">
          <span style="font-weight: 700;">调色器</span>
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
      <el-input v-model="store.activeTarget.name" placeholder="choose name">
        <template #prepend>目标:</template>
      </el-input>
      <div :class="build('tool2','info')">
        ❗note: <span style="font-size: 14px;">{{ store.activeTarget.info }}</span>
      </div>
      <hr />
      <div :class="build('tool2','config')">
        <div class="configs_title">
          <span style="font-weight: 700;">参数配置</span>
          <el-tooltip placement="bottom">
            <template #content>
              底板|区域|组件都是由下方参数定义的<br>
              通过修改参数定义自己的设计
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
        <EditBasePlate v-if="mailRep.targetChoose.basePlate.active"></EditBasePlate>
      </div>
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
import { indexStore } from '../store/IndexPinia'
import { mailStore } from '../store/MailPinia'
import EditBasePlate from './edit/EditBasePlate.vue'

const mailRep = mailStore()
const store = indexStore()
const colorPickerRef = ref()
const component = 'EditTools'
let globalColor = ref('#dedeff')
let targetChoose = reactive({
  basePlate: false,
  area: false,
  model: false
})

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
  @include buildWrap($component, 'tool2') {
    height: calc(100% - 120px);
    box-sizing: border-box;
    padding: 0 2.5%;
    @include build('tool2', 'info') {
      height: auto;
      box-sizing: border-box;
      padding-top: 8px;
    }
    @include build('tool2', 'config') {
      width: 100%;
      height: calc(100% - 160px);
      .configs_title {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        .el-icon {
          cursor: pointer;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>