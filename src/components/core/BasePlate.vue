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
                          <el-popover trigger="contextmenu" :visible="areaTipVisibles[areaIndex]" placement="bottom" :width="100" v-for="areaItem,areaIndex in store.currentMailModel.areas" :key="areaItem.id">
                            <template #reference>
                              <tr ref="AreaRef" @click.stop="chooseArea(areaIndex)">
                                <td :style="areaStyle(areaIndex)">
                                  <el-popover trigger="contextmenu" :visible="modelTipVisibles[areaIndex][mIndex]" title="添加|删除" placement="bottom" :width="100" v-for="mItem,mIndex in areaItem.modelItem" :key="mItem.id">
                                    <template #reference>
                                      <ModelItem :data="mItem" @click.stop="chooseModel(areaIndex,mIndex)"></ModelItem>
                                    </template>
                                    <template #default>
                                      <div class="info_line">
                                        <el-button type="primary" @click="addModel(areaIndex)">添加组件</el-button>
                                        <el-tooltip placement="bottom">
                                          <template #content>组件会被添加到区域中<br />组件是模板的主要构成要素</template>
                                          <el-icon size="16">
                                            <InfoFilled />
                                          </el-icon>
                                        </el-tooltip>
                                      </div>
                                      <div class="info_line">
                                        <el-button type="primary" @click="delModel(areaIndex,mIndex)">删除组件</el-button>
                                        <el-tooltip placement="bottom">
                                          <template #content>当前组件将会从该区域移除</template>
                                          <el-icon size="16">
                                            <InfoFilled />
                                          </el-icon>
                                        </el-tooltip>
                                      </div>
                                      <div class="info_line">
                                        <el-button type="primary" @click="delArea(areaIndex)">删除区域</el-button>
                                        <el-tooltip placement="bottom">
                                          <template #content>删除当前区域,同时删除包含的组件</template>
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
                            <template #default>
                              <div class="info_title">
                                <span>添加|删除</span>
                                <el-icon size="18" @click="areaTipVisibles[areaIndex] = false">
                                  <CircleCloseFilled />
                                </el-icon>
                              </div>
                              <div class="info_line">
                                <el-button type="primary" @click="addModel(areaIndex)">添加组件</el-button>
                                <el-tooltip placement="bottom">
                                  <template #content>组件会被添加到区域中<br />组件是模板的主要构成要素</template>
                                  <el-icon size="16">
                                    <InfoFilled />
                                  </el-icon>
                                </el-tooltip>
                              </div>
                              <div class="info_line">
                                <el-button type="primary" @click="delArea(areaIndex)">删除区域</el-button>
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
import { useRouter } from 'vue-router'
import { build, buildView, buildWrap } from '../../styles/name'
import { BaseModel, Model, defaultAreaModel, defalutModelItem } from '../../core'
import { InfoFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { indexStore } from '../../store/IndexPinia'
import { mailStore } from '../../store/MailPinia'
import ModelItem from './ModelItem.vue'
import { generateUUID } from '../../util'

const router = useRouter()
const mailRep = mailStore()
const store = indexStore()
const emits = defineEmits(['choose'])
let basePlateTipVisible = ref(false)
let areaTipVisibles = reactive<Array<boolean>>([])
let modelTipVisibles = reactive<Array<Array<boolean>>>([])
const initAreaTipVisibles = () => {
  let { areas } = store.currentMailModel
  for (let i = 0; i < areas.length; i++) {
    areaTipVisibles.push(false)
  }
}
const initModelTipVisibles = () => {
  let { areas } = store.currentMailModel
  for (let i = 0; i < areas.length; i++) {
    let row = []
    for (let j = 0; j < areas[i].modelItem.length; j++) {
      row.push(false)
    }
    modelTipVisibles.push(row)
  }
}
initAreaTipVisibles()
initModelTipVisibles()
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
  areaTipVisibles.push(false)
  modelTipVisibles.push([false])
  let tmp = defaultAreaModel

  store.pushAreaToCurrentMailModel(tmp)
  //添加一个组件到区域中
  store.pushModelToArea(store.currentMailModel.areas.length - 1)
}

//选择区域
const chooseArea = (areaIndex: number) => {
  areaTipVisibles[areaIndex] = !areaTipVisibles[areaIndex]
  if (areaTipVisibles[areaIndex]) {
    AreaRef.value[areaIndex].style.border = '0.5px dashed #ee4553'
  } else {
    AreaRef.value[areaIndex].style.border = '0px'
  }
  mailRep.activeTarget(1)
  store.activeTarget.info = mailRep.targetChoose.area.info
  store.activeTarget.name = mailRep.targetChoose.area.name
  mailRep.areaId = areaIndex
}
//区域样式
let areaStyle = computed(() => (areaIndex: number) => {
  let { bgColor, textAlign, direction, justifyContent, span } = store.currentMailModel.areas[areaIndex]

  return 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';' + 'display:flex;align-items:center;justify-content:' + justifyContent + ';'
})

//删除区域
const delArea = (areaIndex: number) => {
  areaTipVisibles.splice(areaIndex, 1)
  store.activeTarget.info = ''
  store.activeTarget.name = ''
  store.currentMailModel.areas.splice(areaIndex, 1)
  mailRep.areaId = store.currentMailModel.areas.length - 1
}

//选择组件
const chooseModel = (areaIndex: number, mIndex: number) => {
  modelTipVisibles[areaIndex][mIndex] = !modelTipVisibles[areaIndex][mIndex]
  mailRep.activeTarget(2)
  store.activeTarget.info = mailRep.targetChoose.model.info
  store.activeTarget.name = mailRep.targetChoose.model.name
  mailRep.chooseModel(areaIndex, mIndex)
}

const addModel = (areaIndex: number) => {
  store.pushModelToArea(areaIndex)
}

const delModel = (areaIndex: number, mIndex: number) => {
  store.currentMailModel.areas[areaIndex].modelItem.splice(mIndex, 1)
}
</script>

<style lang="scss" scoped>
.info_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 6px 0;
  font-size: 16px;
  font-weight: 700;
  .el-icon {
    cursor: pointer;
  }
}
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