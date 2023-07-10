<template>
  <div :id="buildView(component)">
    <div :class="build(component,'title')">EStylist</div>
    <div :class="buildWrap(component,'content')">
      <div :class="build('content','title')">
        {{ getStr(store.settings.language,pagei18n.info.what) }}
      </div>
      <div :class="build('content','des')">
        {{ getStr(store.settings.language,pagei18n.info.des) }}
      </div>
      <div :class="build('content','title')">
        {{ getStr(store.settings.language,pagei18n.info.promise) }}
      </div>
      <div :class="build('content','des')">
        {{ getStr(store.settings.language,pagei18n.info.promiseDes) }}
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="version" label="Version" width="200" />
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="author" label="Author" />
      </el-table>
    </div>
    <el-button type="primary" class="updateBtn" @click="checkUpdate">{{  getStr(store.settings.language,pagei18n.buttons.checkUpdate)  }}</el-button>
  </div>
  <el-dialog v-model="updateVisiable" :title="getStr(store.settings.language,pagei18n.common.uploadTemplate.title)" width="40%">
    <div style="text-align: left;">
      当前版本:{{ store.settings.version }} {{ updateOrNot }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="updateConfirm">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'MailInfo'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { invoke } from '@tauri-apps/api'
import { ElMessage } from 'element-plus'
const component = 'MailInfo'
const store = indexStore()
let updateVisiable = ref(false)
let updateOrNot = ref('')
const tableData = [
  {
    date: '2023-07-01',
    version: '0.0.1',
    author: 'syf20020816@outlook.com'
  },
  {
    date: '2023-07-16',
    version: '0.0.2',
    author: 'syf20020816@outlook.com'
  }
]

const checkUpdate = () => {
  invoke('check_update').then(res => {
    if (res) {
      updateOrNot.value = '并非最新版本,可以进行更新（请保证网络连接通畅,且能够正常连接到GitHub!）,您是否需要进行和更新?'
    } else {
      updateOrNot.value = '当前已经是最新版本,无需进行更新!'
    }
    updateVisiable.value = true
    console.log(res)
  })
}

const updateConfirm = () => {
  updateVisiable.value = false
}
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'MailInfo';

@include buildView($component) {
  height: inherit;
  width: calc(100vw - 60px);
  text-align: left;
  color: $bg-color-light;

  @include build($component, 'title') {
    height: 6vh;
    font-size: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-shadow: 1px 0px 2px #fff;
    margin: 1.5vh 0;
  }
  @include buildWrap($component, 'content') {
    padding: 0 16px;

    @include build('content', 'title') {
      font-size: 3vh;
      font-weight: 700;
      margin: 1vh 0;
      box-sizing: border-box;
    }
    @include build('content', 'des') {
      font-size: 2.5vh;
      text-align: justify;
      margin: 1vh 1vw;
      box-sizing: border-box;
      line-height: 1.5em;
    }
  }
  .updateBtn {
    position: absolute;
    bottom: 10px;
    right: 0%;
    transform: translate(-50%, 0);
  }
}
</style>