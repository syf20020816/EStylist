<template>
  <tr ref="AreaRef" @click="chooseArea">
    <td :style="areaStyle">
      <el-popover trigger="contextmenu" :visible="modelTipVisibles[index]" title="添加|删除" placement="bottom" :width="100" v-for="item,index in store.currentComponent.modelItem" :key="index">
        <template #reference>
          <ModelItem :data="item" @click.stop="chooseModel(index)"></ModelItem>
        </template>
        <template #default>
          <div class="info_line">
            <el-button type="primary" @click="addModel">添加组件</el-button>
            <el-tooltip placement="bottom">
              <template #content>组件会被添加到区域中<br />组件是模板的主要构成要素</template>
              <el-icon size="16">
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="info_line">
            <el-button type="primary" @click="delModel(index)">删除组件</el-button>
            <el-tooltip placement="bottom">
              <template #content>当前组件将会从该区域移除</template>
              <el-icon size="16">
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="info_line">
            <el-button type="primary" @click="chooseArea">修改区域</el-button>
            <el-tooltip placement="bottom">
              <template #content>修改包裹组件的外部区域</template>
              <el-icon size="16">
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-popover>
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  name: 'Component'
}
</script>

<script lang="ts" setup>
import ModelItemVue from './ModelItem.vue'
import { defalutModelItem } from '../../core'
import { ref, reactive, computed, PropType } from 'vue'
import { indexStore } from '../../store/IndexPinia'
import { parseArray } from '../../util'
import { CircleCloseFilled, InfoFilled } from '@element-plus/icons-vue'
import { mailStore } from '../../store/MailPinia'
import ModelItem from './ModelItem.vue'

const component = 'Component'
const mailRep = mailStore()
const store = indexStore()
let modelTipVisibles = reactive<Array<boolean>>([])
const initComponent = () => {
  if (store.currentComponent.modelItem.length == 0) {
    store.pushComponentToArea()
  } else {
    return
  }
}
initComponent()
const initModelTipVisibles = () => {
  let { modelItem } = store.currentComponent
  for (let i = 0; i < modelItem.length; i++) {
    modelTipVisibles.push(false)
  }
}

const reinitModelTipVisibles = () => {
  modelTipVisibles.splice(0, modelTipVisibles.length)
  initModelTipVisibles()
}

initModelTipVisibles()

let areaStyle = computed(() => {
  let { bgColor, textAlign, direction, justifyContent } = store.currentComponent
  let directionStyle = 'flex-direction:column;'
  if (direction == 'x') {
    directionStyle = 'flex-direction:row;'
  }
  return 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';' + 'display:flex;align-items:center;justify-content:' + justifyContent + ';' + directionStyle
})

const addModel = () => {
  store.pushComponentToArea()
}

const delModel = (index: number) => {
  store.currentComponent.modelItem.splice(index, 1)
}
const chooseArea = () => {
  mailRep.activeTarget(3)
  mailRep.componentIndex = -1
  store.activeTarget.info = mailRep.targetChoose.componentArea.info
  store.activeTarget.name = mailRep.targetChoose.componentArea.name
}
const chooseModel = (index: number) => {
  modelTipVisibles[index] = !modelTipVisibles[index]
  mailRep.componentIndex = index
  mailRep.activeTarget(4)
  store.activeTarget.info = mailRep.targetChoose.component.info
  store.activeTarget.name = mailRep.targetChoose.component.name
}

defineExpose({
  reinitModelTipVisibles
})
</script>

<style lang="scss" scoped>
.info_line {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 6px 0;
  .el-icon {
    cursor: pointer;
  }
}
</style>