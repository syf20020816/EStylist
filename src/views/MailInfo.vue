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
      <div>
        <ul>
          <li> 降低用户使用门槛，提升用户体验</li>
          <li> 增加设置：版本、软件安装目录</li>
          <li> 增加检查更新功能</li>
          <li> 优化模板编辑结构</li>
          <li> 增加模板编辑排版方向属性</li>
          <li> 增加区域跨度属性</li>
          <li> 修改模板删除（删除后刷新重加载）</li>
          <li> 优化内部页面结构</li>
          <li> 优化内部数据结构</li>
          <li> 去除区域冗余属性</li>
          <li> 文档修改</li>
        </ul>
      </div>
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
import { exit } from '@tauri-apps/api/process'
import { ElMessage } from 'element-plus'
const component = 'MailInfo'
const store = indexStore()
let updateVisiable = ref(false)
// 更新提示
let updateOrNot = ref('')
// 进行更新
let updateNow = ref(false)
const tableData = [
  {
    date: '2023-06-23',
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
      updateNow.value = true
    } else {
      updateOrNot.value = '当前已经是最新版本,无需进行更新!'
    }
    updateVisiable.value = true
    console.log(res)
  })
}

// 确定更新
const updateConfirm = () => {
  if (updateNow.value) {
    invoke('update_version').then(async () => {
      updateVisiable.value = false
      await exit(1)
    })
  }
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