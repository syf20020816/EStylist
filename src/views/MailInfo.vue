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
      <div style="overflow-y: scroll;height: 40vh;margin-top: 10px;">
        <ul>
          <li v-for="item,index in updateList" :key="index">✅{{ item }}</li>
        </ul>
      </div>
    </div>
    <el-button type="primary" class="updateBtn" @click="checkUpdate">{{  getStr(store.settings.language,pagei18n.buttons.checkUpdate)  }}</el-button>
  </div>
  <el-dialog v-model="updateVisiable" :title="getStr(store.settings.language,pagei18n.common.uploadTemplate.title)" width="40%">
    <div style="text-align: left;">
      Version:{{ store.settings.version }} {{ updateOrNot }}
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
import { ref, reactive, computed } from 'vue'
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
    date: '2023-07-11',
    version: '0.0.2',
    author: 'syf20020816@outlook.com'
  },
  {
    date: '2023-08-02',
    version: '0.1.0',
    author: 'syf20020816@outlook.com'
  },
  {
    date: '2023-08-07',
    version: '0.1.1',
    author: 'syf20020816@outlook.com'
  }
]

const checkUpdate = () => {
  let { language } = store.settings
  invoke('check_update').then(res => {
    if (res) {
      updateOrNot.value = getStr(language, pagei18n.info.update[0])
      updateNow.value = true
    } else {
      updateOrNot.value = getStr(language, pagei18n.info.update[1])
    }
    updateVisiable.value = true
  })
}

// 确定更新
const updateConfirm = () => {
  if (updateNow.value) {
    invoke('update_version').then(async () => {
      updateVisiable.value = false
      await exit(1)
    })
  } else {
    updateVisiable.value = false
  }
}

let updateList = computed(() => {
  let lang = store.settings.language
  if (lang == 'Chinese') {
    return ['完善组件|模板商店预览显示问题', '完善编辑界面显示问题']
  }
  return ['Improve Components | Template Store Preview Display Issues', 'Improve the editing interface display issues']
})
</script>

<style lang="scss" scoped>
@use '../styles/views/MailInfo.scss';
</style>