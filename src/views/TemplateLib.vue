<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :class="buildWrap('left','top')">
        <el-input v-model="searchInput" placeholder="Please input" class="input-with-select">
          <template #append>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>
      </div>
      <div :class="buildWrap('left','mid')">
        <div class="jsonBox" v-for="item,index in downloadList" :key="index">
          <el-tooltip effect="dark" :content="item.name" placement="top">
            <el-tag type="dark" class="tagName" effect="dark">
              {{ item.name }}
            </el-tag>
          </el-tooltip>
          <img class="jsonImg" src="../assets/template.svg" alt="json">
          <el-button type="primary" size="small" :icon="View" @click="preview(item)">{{getStr(store.settings.language,pagei18n.buttons.preview)}}</el-button>
          <el-button type="primary" size="small" :icon="Download" @click="download(index)">{{getStr(store.settings.language,pagei18n.buttons.download)}}</el-button>
        </div>
      </div>
      <div :class="buildWrap('left','bottom')">

        <el-button type="primary" :icon="Refresh" @click="reRresh">{{ getStr(store.settings.language,pagei18n.buttons.refresh) }}</el-button>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="buildWrap('right','title')">
        {{ getStr(store.settings.language,pagei18n.lib.preview) }}
      </div>
      <div :class="buildWrap('right','preview')">
        <div class="info">
          <div class="info_line">
            <div>{{ getStr(store.settings.language,pagei18n.lib.fileName) }}:</div>
            <el-input v-model="currentInfo.name" disabled></el-input>
          </div>
          <div class="info_line">
            <div>{{ getStr(store.settings.language,pagei18n.lib.fileSize) }}:</div>
            <el-input v-model="currentInfo.size" disabled></el-input>
          </div>
          <div class="info_line">
            <div>sha:</div>
            <el-input v-model="currentInfo.sha" disabled></el-input>
          </div>
          <div class="info_line">
            <div>{{ getStr(store.settings.language,pagei18n.lib.download) }}:</div>
            <el-input v-model="currentInfo.download_url" disabled></el-input>
          </div>
        </div>
        <div class="preview" v-html="currentPreview"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TemplateLib'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { Search, Refresh, Download, View } from '@element-plus/icons-vue'
import { invoke } from '@tauri-apps/api'
import { ElMessage } from 'element-plus'
import { getStr, pagei18n } from '../core'
import { indexStore } from '../store/IndexPinia'
const component = 'TemplateLib'
const store = indexStore()
let searchInput = ref('')
let currentPreview = ref('')
let currentInfo = reactive<any>({})
let downloadJsonList = reactive<Array<any>>([])
let downloadList = reactive<Array<any>>([])

//初始化
const initPage = () => {
  invoke('get_data_from_github', { isTemplate: true }).then((res: any) => {
    res.forEach((item: any) => {
      if (item.name.endsWith('.html')) {
        downloadList.push(item)
      } else {
        downloadJsonList.push(item)
      }
    })
  })
}

initPage()

const preview = (item: any) => {
  currentInfo = item
  invoke('get_preview_html', { url: item.download_url }).then((res: any) => {
    currentPreview.value = res
  })
}

const download = (index: number) => {
  let url = downloadJsonList[index].download_url
  let name = downloadJsonList[index].name
  invoke('download_json_from_github', { name: name, url: url, isTemplate: true })
    .then(() => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadTemplateSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      console.log(e)
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadTemplateFail),
        type: 'error'
      })
    })
}

const reRresh = () => {
  downloadList.splice(0, downloadList.length)
  downloadJsonList.splice(0, downloadJsonList.length)
  initPage()
}

const search = () => {
  if (searchInput.value != '') {
    let tmp = []
    for (let i = 0; i < downloadList.length; i++) {
      if (downloadList[i].name.includes(searchInput.value)) {
        tmp.push(downloadList[i])
      }
    }
    downloadList.splice(0, downloadList.length)
    tmp.forEach(res => {
      downloadList.push(res)
    })
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'TemplateLib';

@include buildView($component) {
  height: inherit;
  width: calc(100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include buildWrap($component, 'left') {
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    background-color: $bg-color-dark-weak;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    @include buildWrap('left', 'top') {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: baseline;
      box-sizing: border-box;
    }
    @include buildWrap('left', 'mid') {
      background-color: $bg-color-dark;
      height: calc(100% - 120px);
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow-y: scroll;
      scrollbar-width: thin;
      align-content: baseline;
      .jsonBox {
        height: auto;
        width: 100px;
        box-sizing: border-box;
        padding: 8px;
        margin: 4px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .tagName {
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          justify-content: flex-start;
        }
        .jsonImg {
          height: 60px;
          margin: 8px 0;
        }
        .el-button {
          margin: 4px auto;
        }
      }
    }
    @include buildWrap('left', 'bottom') {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  @include buildWrap($component, 'right') {
    width: 60%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;

    @include buildWrap('right', 'title') {
      display: flex;
      align-items: center;
      font-weight: 700;
      height: 36px;
      font-size: 18px;
      justify-content: flex-start;
    }
    @include buildWrap('right', 'preview') {
      width: 100%;
      height: calc(100% - 36px);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: nowrap;
      .info {
        width: 30%;
        height: 100%;
        .info_line {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          font-size: 14px;
          text-align: left;
        }
      }
      .preview {
        overflow: scroll;
        border-left: 1px solid #fff;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 300px;
        padding-top: 32px;
        padding-bottom: 32px;
        padding-right: 60px;
        justify-content: center;
        width: calc(69%);
        height: 100%;
      }
    }
  }
}
</style>