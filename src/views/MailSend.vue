<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :class="build(component,'tools')">
        <div :class="build('tool','item')">
          <div class="title">{{ getStr(store.settings.language,pagei18n.send.title) }}:</div>
          <el-input v-model="MailSend.subject" :placeholder="getStr(store.settings.language,pagei18n.send.title)" clearable></el-input>
        </div>
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
        <el-button type="primary" @click="uploadTemplateCheck">{{ getStr(store.settings.language,pagei18n.buttons.choose) }}</el-button>
        <el-button type="primary" @click="sendEmail">{{ getStr(store.settings.language,pagei18n.buttons.send) }}</el-button>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="build(component,'connectTitle')"> {{ getStr(store.settings.language,pagei18n.settings.connector) }}</div>
      <div :class="build(component,'connectList')">
        <div :class="build('connectList','item')" v-for="item,index in store.settings.contacts" :key="index">
          <span style="overflow-x:hidden;display: inline-block;width: calc(100% - 64px);"> {{ item }}</span>
          <span>
            <el-icon size="16" @click="addRecipient(item)">
              <Promotion />
            </el-icon>
            <el-icon size="16" @click="addCC(item)">
              <CopyDocument />
            </el-icon>
            <el-icon size="16" @click="delContact(item)">
              <CircleCloseFilled />
            </el-icon>
          </span>
        </div>
      </div>
      <div :class="build(component,'connectBottom')">
        <el-button type="primary" @click="addContactVisiable = true">{{ getStr(store.settings.language,pagei18n.buttons.addContract) }}</el-button>
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
import { Promotion, CopyDocument, CircleCloseFilled } from '@element-plus/icons-vue'

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
  cc: '',
  subject: ''
})

// 上传模板文件检查
const uploadTemplateCheck = () => {
  invoke('load_html_templates').then((res: any) => {
    store.htmlTemplates = res

    if (res.length == 0) {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.noTemplate),
        type: 'info'
      })
    } else {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.loadTemplateSuccess),
        type: 'info'
      })
    }
  })
  uploadTemplateVisiable.value = true
}

// 上传文件
const uploadTemplate = () => {
  invoke('upload_file', { name: uploadTemplateTarget.value, isTemplate: true })
    .then((res: any) => {
      sendMailHTML.value = res

      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadTemplateSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadTemplateFail),
        type: 'error'
      })
    })
  setTimeout(() => {
    uploadTemplateVisiable.value = false
  }, 750)
}

const addContact = () => {
  invoke('add_contact', { email: contact.value })
    .then((res: any) => {
      store.settings = JSON.parse(res)
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.addContractSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: e,
        type: 'error'
      })
    })

  addContactVisiable.value = false
}

const addRecipient = (email: string) => {
  MailSend.value.to = email
}
const addCC = (email: string) => {
  MailSend.value.cc = email
}

const delContact = (email: string) => {
  invoke('del_contact', { email: email })
    .then((res: any) => {
      store.settings = JSON.parse(res)
      ElMessage({
        message: 'Del Contact Successfully!',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: 'Del Contact Failed!',
        type: 'error'
      })
    })
}

const sendEmail = () => {
  invoke('send_email', { from: store.settings.email, cc: MailSend.value.cc, to: MailSend.value.to, subject: MailSend.value.subject, content: sendMailHTML.value })
    .then((res: any) => {
      ElMessage({
        message: res,
        type: 'info'
      })
    })
    .catch(e => {
      ElMessage({
        message: e,
        type: 'error'
      })
    })
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
@use '../styles/views/MailSend.scss';
</style>