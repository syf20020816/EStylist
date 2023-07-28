<template>
  <div :id="buildView(component)">
    <div :class="build(component,'title')">{{ getStr(store.settings.language,pagei18n.settings.title) }}</div>
    <div :class="buildWrap(component,'content')">
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.version) }}</div>
        <el-input v-model="store.settings.version" disabled></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.dir) }}</div>
        <el-input v-model="store.settings.dir" disabled></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.confPath) }}</div>
        <el-input v-model="store.settings.store" disabled></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.templatePath) }}</div>
        <el-input v-model="store.settings.template" clearable></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.email) }}</div>
        <el-input v-model="store.settings.email" clearable></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.password) }}</div>
        <el-input v-model="store.settings.password" clearable type="password" show-password></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">SMTP</div>
        <el-input v-model="store.settings.smtp" clearable></el-input>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.autoTemplate) }}</div>
        <el-switch v-model="store.settings.auto" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.spaceProportion) }}</div>
        <el-select v-model="store.settings.proportion" class="m-2" placeholder="Select">
          <el-option v-for="item in Proportion" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div :class="build('content','item')">
        <div :class="build('item','title')">{{ getStr(store.settings.language,pagei18n.settings.lang) }}</div>
        <el-select v-model="store.settings.language" class="m-2" placeholder="Select">
          <el-option v-for="litem in Language" :key="litem.value" :label="litem.label" :value="litem.value" />
        </el-select>
      </div>
      <div style="position: absolute;bottom: 16px;right: 32px;">
        <el-button type="primary" round @click="saveSettings">
          <div style="margin: 0 10px;display: flex;align-items: center;justify-content: center;"><el-icon size="18"><Select /></el-icon>
            {{ getStr(store.settings.language,pagei18n.buttons.save) }}</div>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { indexStore } from '../store/IndexPinia'
import { Select } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api'
import { ElMessage } from 'element-plus'
import { pagei18n, getStr } from '../core'

const store = indexStore()
const component = 'Setting'

const Language = [
  {
    label: '中文',
    value: 'Chinese'
  },
  {
    label: 'English',
    value: 'English'
  }
]

const Proportion = [
  {
    label: '1:1',
    value: '1:1'
  },
  {
    label: '2:3',
    value: '2:3'
  },
  {
    label: '3:2',
    value: '3:2'
  },
  {
    label: '13:7',
    value: '13:7'
  },
  {
    label: '7:13',
    value: '7:13'
  },
  {
    label: '2:1',
    value: '2:1'
  }
]

const saveSettings = () => {
  let tmp = JSON.stringify(store.settings)
  invoke('save_settings', { settings: tmp })
    .then(() => {
      ElMessage({
        message: 'save successfully!',
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: 'save failure!',
        type: 'error'
      })
    })
}
</script>

<style lang="scss" scoped>
@use '../styles/views/Setting.scss';
</style>