<template>
  <table @click="chooseBasePlate">
    <tbody>
      <tr>
        <td :style="baseOutterStyles">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <el-popover :visible="basePlateTipVisible" placement="top-start" title="添加" :width="100">
                  <template #reference>
                    <td :style="baseOutterPadding" :bgcolor="baseOtterColor" @click="basePlateTipVisible = !basePlateTipVisible">
                      <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody :style="itemDirection">
                          <el-popover :visible="areaTipVisibles[areaItem.id]" placement="bottom" title="添加|删除" :width="100" v-for="areaItem in store.currentMailModel.areas" :key="areaItem.id">
                            <template #reference>
                              <tr ref="AreaRef" @click.stop="chooseArea(areaItem.id)">
                                <td :style="areaStyle">
                                  <div style="display: inline-block;background-color: red;height: 10em;">nihao </div>
                                </td>
                              </tr>
                            </template>
                            <template #default>
                              <div class="info_line">
                                <el-button type="primary">添加组件</el-button>
                                <el-tooltip placement="bottom">
                                  <template #content>组件会被添加到区域中<br />组件是模板的主要构成要素</template>
                                  <el-icon size="16">
                                    <InfoFilled />
                                  </el-icon>
                                </el-tooltip>
                              </div>
                              <div class="info_line">
                                <el-button type="primary">删除区域</el-button>
                                <el-tooltip placement="bottom">
                                  <template #content>删除当前区域,同时删除包含的组件</template>
                                  <el-icon size="16">
                                    <InfoFilled />
                                  </el-icon>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-popover>

                        </tbody>
                      </table>
                    </td>
                  </template>
                  <template #default>
                    <div class="info_line">
                      <el-button type="primary" @click="addArea">添加区域</el-button>
                      <el-tooltip placement="bottom">
                        <template #content>区域会被添加到底板中<br />区域是一个可以容纳一组组件的容器</template>
                        <el-icon size="16">
                          <InfoFilled />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-popover>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
//对应BaseModel
export default {
  name: 'BaseOutter'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps, PropType } from 'vue'
import { build, buildView, buildWrap } from '../../styles/name'
import { BaseModel, Model, defaultAreaModel } from '../../core'
import { InfoFilled } from '@element-plus/icons-vue'
import { indexStore } from '../../store/IndexPinia'
import { mailStore } from '../../store/MailPinia'

const mailRep = mailStore()
const store = indexStore()
const emits = defineEmits(['choose'])
let basePlateTipVisible = ref(false)
let areaTipVisibles = reactive<Array<boolean>>([])
const initAreaTipVisibles = () => {
  let { areas } = store.currentMailModel
  for (let i = 0; i < areas.length; i++) {
    areaTipVisibles.push(false)
  }
}
initAreaTipVisibles()
let modelTipVisible = ref(false)

let AreaRef = ref()

let baseOutterStyles = computed(() => {
  let { width } = store.currentMailModel.base
  return 'width: ' + width + 'px; min-width: ' + width + 'px; line-height: 0pt; padding: 0; margin: 0; font-weight: normal'
})

let baseOutterPadding = computed(() => {
  let { padding } = store.currentMailModel.base
  return 'padding: ' + padding + 'px'
})

let baseOtterColor = computed(() => {
  let { bgColor } = store.currentMailModel.base
  return bgColor
})

let itemDirection = computed(() => {
  let { direction } = store.currentMailModel.base
  let directionStyle = 'display:flex;flex-direction:column;'
  if (direction == 'x') {
    directionStyle = 'display:flex;flex-direction:row;'
  }
  return directionStyle
})

let modelItemStyles = computed(() => (direction: string) => {
  let flexDirection = 'column'
  if (direction == 'x') {
    flexDirection = 'row'
  }
  return 'display: flex;align-items: flex-start;flex-wrap:wrap;justify-content: flex-start;flex-direction:' + flexDirection + ';'
})

//表示用户选择了底板
//参数配置中显示配置数据
//目标中表示被选中
const chooseBasePlate = () => {
  mailRep.activeTarget(0)
  store.activeTarget.info = mailRep.targetChoose.basePlate.info
  store.activeTarget.name = mailRep.targetChoose.basePlate.name
  emits('choose')
}
//添加区域到底板中
const addArea = () => {
  let tmp = defaultAreaModel
  store.pushAreaToCurrentMailModel(tmp)
  console.log(store.currentMailModel.areas)
}

//选择区域
const chooseArea = (areaId: number) => {
  console.log(AreaRef.value[areaId].style)
  areaTipVisibles[areaId] = !areaTipVisibles[areaId]
  if (areaTipVisibles[areaId]) {
    AreaRef.value[areaId].style.border = '0.5px dashed #ee4553'
  } else {
    AreaRef.value[areaId].style.border = 'none'
  }
  mailRep.activeTarget(1)
  store.activeTarget.info = mailRep.targetChoose.area.info
  store.activeTarget.name = mailRep.targetChoose.area.name
  mailRep.areaId = areaId
}

let areaStyle = computed(() => {
  let { bgColor, textAlign, direction, justifyContent, span } = store.currentMailModel.areas[mailRep.areaId]

  return 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';' + 'display:flex;align-items:center;justify-content:' + justifyContent + ';'
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