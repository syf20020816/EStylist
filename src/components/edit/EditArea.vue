<template>
  <div :class="buildWrap(component,'area')">
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.colSpan) }}</div>
      <el-input-number v-model="areaConfigs.span" :step="1" :max="100" />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>

      <el-input v-model="areaConfigs.bgColor" placeholder="设置颜色,透明为transparent" clearable></el-input>
      <el-tooltip class="box-item" effect="dark" content="复制调色器的颜色" placement="right">
        <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="emits('copyColor')"></el-button>
      </el-tooltip>
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
      <el-select v-model="areaConfigs.justifyContent" placeholder="Select Type">
        <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
      </el-select>
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
      <el-input-number v-model="areaConfigs.modelItem.length" :step="1" :max="20" disabled />
    </div>
    <div :class="build('template','base')">
      <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
      <el-select v-model="areaConfigs.direction" placeholder="Select Direction">
        <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;flex-wrap: wrap;">
      <el-button style="margin: 4px;" type="primary" round @click="addModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.addModel) }}</el-button>
      <el-button style="margin: 4px;" type="warning" round @click="delModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.delModel) }}</el-button>
      <!-- <el-button style="margin: 4px;" type="success" round @click="saveAreaChange(index)">{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button> -->
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'EditArea'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, PropType } from 'vue'
import { build, buildView, buildWrap } from '../../styles/name'
import { pagei18n, getStr, Direction, AreaModel, defaultAreaModel, JustifyContent } from '../../core'
import { indexStore } from '../../store/IndexPinia'
import { CopyDocument } from '@element-plus/icons-vue'
const component = 'EditArea'
const store = indexStore()
let flexArea = ref(false)
const emits = defineEmits(['copyColor'])
const props = defineProps({
  data: {
    type: Object as PropType<AreaModel>,
    default: defaultAreaModel
  },
  index: {
    type: Number,
    default: 0
  }
})

// let areaConfigs = toRef(props.data)
let areaConfigs = computed(() => {
  let { data } = props
  console.log(data)
  return data
})
let itemIndex = computed(() => {
  let { index } = props
  return index
})

// 添加模块
const addModel = (index: number) => {}

const delModel = (index: number) => {}
</script>

<style lang="scss" scoped>
@use '../../styles/name.scss' as *;
@use '../../styles/src/var.scss' as *;

$component: 'EditArea';
@include buildWrap($component, 'area') {
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