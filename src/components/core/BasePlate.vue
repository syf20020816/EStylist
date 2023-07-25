<template>
  <table @click="chooseBasePlate">
    <tbody>
      <tr>
        <td :style="baseOutterStyles">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <el-popover placement="top-start" title="添加" :width="100" trigger="hover">
                  <template #reference>
                    <td :style="baseOutterPadding" :bgcolor="baseOtterColor">

                    </td>
                  </template>
                  <template #default>
                    <div class="info_line">
                      <el-button type="primary">添加区域</el-button>

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
import type { BaseModel, Model } from '../../core'
import { InfoFilled } from '@element-plus/icons-vue'
import { indexStore } from '../../store/IndexPinia'
import { mailStore } from '../../store/MailPinia'

const mailRep = mailStore()
const store = indexStore()
const emits = defineEmits(['choose'])
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

let areaItem = computed(() => {
  let { areas } = store.currentMailModel
  return areas
})

let modelItemExist = (obj: any): boolean => {
  return typeof obj == 'undefined'
}

let itemDirection = computed(() => {
  let { direction } = store.currentMailModel.base
  return direction
})

let modelItemStyles = computed(() => (direction: string) => {
  let flexDirection = 'column'
  if (direction == 'x') {
    flexDirection = 'row'
  }
  return 'display: flex;align-items: flex-start;flex-wrap:wrap;justify-content: flex-start;flex-direction:' + flexDirection + ';'
})

const chooseBasePlate = () => {
  mailRep.targetChoose.basePlate.active = true
  store.activeTarget.info = mailRep.targetChoose.basePlate.info
  store.activeTarget.name = mailRep.targetChoose.basePlate.name
  emits('choose')
}

const tryAdd = () => {
  console.log('object')
}
</script>

<style lang="scss" scoped>
.info_line {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
  .el-icon {
    cursor: pointer;
  }
}
</style>