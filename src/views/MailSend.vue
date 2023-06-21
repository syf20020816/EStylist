<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :class="build(component,'tools')">
        <div :class="build('tool','item')">
          <div class="title">{{ getStr(store.settings.language,pagei18n.send.recipient) }}:</div>
          <el-input v-model="MailSend.to" :placeholder="getStr(store.settings.language,pagei18n.send.recipient)" clearable></el-input>
        </div>
        <div :class="build('tool','item')">
          <div class="title">{{ getStr(store.settings.language,pagei18n.send.cc) }}:</div>
          <el-input v-model="MailSend.cc" :placeholder="getStr(store.settings.language,pagei18n.send.cc)" clearable></el-input>
        </div>
      </div>
      <div class="preview">
        <div v-html="sendMailHTML">

        </div>
        <!-- <BaseOutter id="targetTemplate" ref="targetTemplate" :data="mailModel"></BaseOutter> -->
      </div>
      <div class="send">
        <el-button type="primary" @click="uploadTemplateCheck">Choose</el-button>
        <el-button type="primary">Send</el-button>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="build(component,'connectTitle')"> {{ getStr(store.settings.language,pagei18n.settings.connector) }}</div>
      <div :class="build(component,'connectList')">
        <div :class="build('connectList','item')" v-for="item,index in store.settings.contacts" :key="index">
          <span style="overflow-x:hidden;display: inline-block;width: calc(100% - 50px);"> {{ item }}</span>
          <span>
            <el-icon size="18" @click="addRecipient(item)">
              <Promotion />
            </el-icon>
            <el-icon size="18" @click="addCC(item)">
              <CopyDocument />
            </el-icon>
          </span>
        </div>
      </div>
      <div :class="build(component,'connectBottom')">
        <el-button type="primary" @click="addContactVisiable = true">Add Contact</el-button>
      </div>
    </div>
  </div>
  <!-- load templates -->
  <el-dialog v-model="uploadTemplateVisiable" :title="getStr(store.settings.language,pagei18n.send.uploadTemplate.title)" width="40%">
    <el-select v-model="uploadTemplateTarget" :placeholder="getStr(store.settings.language,pagei18n.send.uploadTemplate.placeholder)" style="width: 90%;">
      <el-option v-for="titem in store.htmlTemplates" :key="titem" :label="titem" :value="titem" />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadTemplateVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="uploadTemplate">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- add contact -->
  <el-dialog v-model="addContactVisiable" :title="getStr(store.settings.language,pagei18n.send.contact.title)" width="40%">
    <el-input v-model="contact" :placeholder="getStr(store.settings.language,pagei18n.send.contact.title)" clearable></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addContactVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="addContact">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'MailSend'
}
</script>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { ElMessage } from 'element-plus'
import { invoke } from '@tauri-apps/api'
import BaseOutter from '../components/BaseOutter.vue'
import { Promotion, CopyDocument } from '@element-plus/icons-vue'

const component = 'MailSend'
const store = indexStore()
let uploadTemplateVisiable = ref(false)
let addContactVisiable = ref(false)
let uploadTemplateTarget = ref('')
let mailModel = ref<any>({})
let contact = ref('')
let targetTemplate = ref()
let sendMailHTML = ref('')

let MailSend = ref({
  to: '',
  cc: ''
})

// 上传模板文件检查
const uploadTemplateCheck = () => {
  invoke('load_html_templates').then((res: any) => {
    store.htmlTemplates = res

    if (res.length == 0) {
      ElMessage({
        message: 'You Have No Templates!',
        type: 'info'
      })
    } else {
      ElMessage({
        message: 'Load Templates Successfully!',
        type: 'info'
      })
    }
  })
  uploadTemplateVisiable.value = true
}

// 上传文件
const uploadTemplate = () => {
  invoke('upload_file', { name: uploadTemplateTarget.value })
    .then((res: any) => {
      sendMailHTML.value = res

      ElMessage({
        message: 'Upload Template Successfully! Please Wait a moment!',
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: 'Upload Template Failure!',
        type: 'error'
      })
    })
  setTimeout(() => {
    uploadTemplateVisiable.value = false
  }, 1500)
}

const addContact = () => {
  invoke('add_contact', { email: contact.value })
    .then((res: any) => {
      store.settings = JSON.parse(res)
      ElMessage({
        message: 'Add Contact Successfully!',
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: e,
        type: 'error'
      })
    })
}

const addRecipient = (email: string) => {
  MailSend.value.to = email
}
const addCC = (email: string) => {
  MailSend.value.cc = email
}

onMounted(() => {
  if (JSON.stringify(store.templateMailModel) != '{}') {
    mailModel.value = store.templateMailModel
  }
  if (store.templateMailHtml == '') {
    sendMailHTML.value = store.templateMailHtml
  }
})
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'MailSend';

@include buildView($component) {
  height: inherit;
  width: 100%;
  text-align: left;
  color: $bg-color-light;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @include buildWrap($component, 'left') {
    height: inherit;
    width: 80%;
    @include build($component, 'tools') {
      height: 100px;
      background-color: $bg-color-dark-deep;
      display: flex;
      align-content: space-around;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      @include build('tool', 'item') {
        width: 100%;
        height: 36px;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          color: $force-color;
          font-size: 2vh;
          font-weight: 700;
          width: 10em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .preview {
      height: calc(90vh - 100px);
      width: 100%;
      overflow: scroll;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .send {
      height: 10vh;
      width: 100%;
      background-color: $bg-color-dark-deep;
      display: flex;
      align-content: center;
      justify-content: space-around;
      align-items: center;
      .el-button {
        width: 40%;
      }
    }
  }
  @include buildWrap($component, 'right') {
    height: inherit;
    width: 20%;
    background-color: $bg-color-dark-deep;
    @include build($component, 'connectTitle') {
      width: 100%;
      height: 5vh;
      font-size: 2.3vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @include build($component, 'connectList') {
      height: calc(100% - 15vh);
      width: 100%;
      padding: 0 8px;
      box-sizing: border-box;
      overflow-y: scroll;
      @include build('connectList', 'item') {
        height: 5vh;
        font-size: 2vh;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px;
        box-sizing: border-box;
        .el-icon {
          cursor: pointer;
          transition: all 0.4s ease-in-out;
          margin: 0 2px;
          &:hover {
            color: $force-color;
          }
        }
      }
    }
    @include build($component, 'connectBottom') {
      height: 10vh;
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>