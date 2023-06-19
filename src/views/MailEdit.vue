<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :style="scaleViewStyle">
        <!-- todo: -->
        <BaseOutter :data="mailModel"></BaseOutter>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="buildWrap(component,'templates')">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template #title>
              构建底板
            </template>
            <div>

              <div :class="build('template','base')">
                <div class="tmptitle">底板宽度</div>
                <el-input-number v-model="mailModel.base.width" :step="10" :max="800" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">底板颜色</div>
                <el-color-picker v-model="mailModel.base.bgColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">字体大小</div>
                <el-input-number v-model="mailModel.base.fontSize" :step="1" :max="60" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">内边距</div>
                <el-input-number v-model="mailModel.base.padding" :step="2" :max="100" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">区域个数</div>
                <el-input-number v-model="mailModel.base.areaNum" :step="1" :max="20" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">排版方向</div>
                <el-select v-model="mailModel.base.direction" placeholder="Select Direction">
                  <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
                <el-button type="success" round @click="saveBaseChange">Save Change</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :name="generateUUID()" v-for="citem,index in mailModel.areas" :key="index">
            <template #title>
              构建区域{{ index+1 }}
            </template>
            <div>
              <!-- <div :class="build('template','base')">
                <div class="tmptitle">区域高度</div>
                <el-input-number v-model="citem.height" :step="10" :max="800" />
              </div> -->
              <div :class="build('template','base')">
                <div class="tmptitle">区域跨度</div>
                <el-input-number v-model="citem.span" :step="10" :max="800" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">区域颜色</div>
                <el-color-picker v-model="citem.bgColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">字体类型</div>
                <el-select v-model="citem.fontFamily" placeholder="Select FontFamily">
                  <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
                </el-select>
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">字体颜色</div>
                <el-color-picker v-model="citem.fontColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">字体大小</div>
                <el-input-number v-model="citem.fontSize" :step="1" :max="60" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">子区域个数</div>
                <el-input-number v-model="citem.areaNum" :step="1" :max="20" />
              </div>
              <div :class="build('template','base')" style="flex-wrap: wrap;">
                <div class="tmptitle">内边距</div>
                <div class="wrapline">上:<el-input-number v-model="citem.padding[0]" :step="1" :max="40" /></div>
                <div class="wrapline">右:<el-input-number v-model="citem.padding[1]" :step="1" :max="40" /></div>
                <div class="wrapline">下:<el-input-number v-model="citem.padding[2]" :step="1" :max="40" /></div>
                <div class="wrapline">左:<el-input-number v-model="citem.padding[3]" :step="1" :max="40" /></div>
              </div>
              <div :class="build('template','base')" style="flex-wrap: wrap;">
                <div class="tmptitle">外边距</div>
                <div class="wrapline">上:<el-input-number v-model="citem.margin[0]" :step="1" :max="40" /></div>
                <div class="wrapline">右:<el-input-number v-model="citem.margin[1]" :step="1" :max="40" /></div>
                <div class="wrapline">下:<el-input-number v-model="citem.margin[2]" :step="1" :max="40" /></div>
                <div class="wrapline">左:<el-input-number v-model="citem.margin[3]" :step="1" :max="40" /></div>
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">排版方向</div>
                <el-select v-model="citem.direction" placeholder="Select Direction">
                  <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
                <el-button type="success" round @click="saveBaseChange">Save Change</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div :class="buildWrap(component,'edit')"></div>
      <div :class="buildWrap(component,'tools')">
        <el-icon size="18" @click="scaleView(-0.1)">
          <ZoomOut />
        </el-icon>
        <el-icon size="18" @click="scaleView(0.1)">
          <ZoomIn />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MailEdit'
}
</script>

<script lang="ts" setup>
import { generateUUID } from '../util'
import { ref, reactive, computed } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { ZoomIn, ZoomOut, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { BaseModel, AreaModel, Model } from '../core'
import BaseOutter from '../components/BaseOutter.vue'

const component = 'MailEdit'
const Direction = [
  {
    value: 'x',
    label: 'x'
  },
  {
    value: 'y',
    label: 'y'
  }
]
const FontFamily = [
  {
    value: 'Helvetica',
    label: 'Helvetica'
  },
  {
    value: 'Arial Narrow',
    label: 'Arial Narrow'
  },
  {
    value: 'Verdana',
    label: 'Verdana'
  },
  {
    value: 'Arial',
    label: 'Arial'
  },
  {
    value: 'Franklin Gothic Medium',
    label: 'Franklin Gothic Medium'
  }
]
let mailModel = reactive({
  base: {
    // height: 240,
    width: 180,
    bgColor: '#fff',
    fontSize: 16,
    areaNum: 1,
    direction: 'y',
    padding: 0
  },
  areas: [
    {
      height: 240,
      width: 180,
      bgColor: '#fff',
      fontSize: 16,
      fontColor: '#000',
      fontFamily: 'Helvetica',
      areaNum: 1,
      direction: 'y',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      textAlign: 'center',
      span: 1
    }
  ] as Array<AreaModel>,
  areasLen: 1
})

// let mailArea = reactive({
//   height: 240,
//   width: 180,
//   bgColor: '#fff',
//   fontSize: 16,
//   fontColor: '#000',
//   areaNum: 1,
//   direction: 'x'
// })
let scaleViewSize = ref(1)
let scaleViewStyle = computed(() => {
  return {
    transform: 'scale(' + scaleViewSize.value + ')'
  }
})
const scaleView = (num: number) => {
  scaleViewSize.value += num
}

const saveBaseChange = () => {
  let oldLen = mailModel.areasLen
  if (oldLen < mailModel.base.areaNum) {
    for (let i = oldLen; i < mailModel.base.areaNum; i++) {
      let tmp: AreaModel = {
        height: 100,
        width: 180,
        bgColor: '#fff',
        fontSize: 16,
        fontColor: '#000',
        fontFamily: 'Helvetica',
        areaNum: 1,
        direction: 'y',
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        textAlign: 'center',
        span: 1
      }
      mailModel.areas.push(tmp)
    }
  } else if (oldLen > mailModel.base.areaNum) {
    for (let i = oldLen; i > mailModel.base.areaNum; i--) {
      mailModel.areas.pop()
    }
  } else {
  }
  mailModel.areasLen = mailModel.areas.length
  ElMessage({
    message: 'Change Save Successfully',
    type: 'success'
  })
}
</script>

<style lang="scss" >
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'MailEdit';

@include buildView($component) {
  height: inherit;
  width: calc(100vw - 60px);
  text-align: left;
  color: $bg-color-light;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include buildWrap($component, 'left') {
    width: 70%;
    height: inherit;
    overflow: scroll;
    scrollbar-width: thin;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px;
    box-sizing: border-box;
  }
  @include buildWrap($component, 'right') {
    width: 30%;
    height: inherit;
    background-color: $bg-color-dark-deep;

    @include buildWrap($component, 'templates') {
      height: 70%;
      width: 100%;
      overflow-y: scroll;
      scrollbar-width: thin;
      @include build('template', 'base') {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: inherit;
        height: auto;
        margin: 0.5vh 0;
        .tmptitle {
          white-space: nowrap;
          margin-right: 16px;
        }
        .wrapline {
          width: 100%;
          .el-input-number {
            margin-left: 16px;
          }
        }
      }
      .el-collapse {
        color: $bg-color-light;
      }
      .el-collapse-item__header {
        background-color: transparent;
        color: $bg-color-light;
        text-indent: 10px;
      }
      .el-collapse-item__content {
        background-color: $bg-color-dark;
        color: $bg-color-light;
        padding: 1vh 0.5vw;
      }
    }
    @include buildWrap($component, 'edit') {
      height: calc(30% - 24px);
      width: 100%;
    }
    @include buildWrap($component, 'tools') {
      height: 24px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .el-icon {
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        &:hover {
          filter: drop-shadow(0 0 4px $force-color) brightness(1.5);
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>