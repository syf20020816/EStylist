<template>
  <div :id="buildView(component)">
    <el-card class="box-card" v-for="item,index in tips" :key="index">
      <template #header>
        <div class="card-header">
          <span>{{ getStr(store.settings.language,item.name)}}</span>
          <el-button class="button" type="primary" :icon="Finished" @click="toNext(index)">{{ getStr(store.settings.language,pagei18n.buttons.know) }}</el-button>
        </div>
      </template>
      <div v-for="info,infoIndex in item.infos" :key="infoIndex" class="text item">{{ getStr(store.settings.language,info) }}</div>
    </el-card>
  </div>
</template>


<script lang="ts">
export default {
  name: 'Tips'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { buildWrap, build, buildView } from '../styles/name'
import { Finished } from '@element-plus/icons-vue'
import { getStr, pagei18n, I18n } from '../core'
import { indexStore } from '../store/IndexPinia'
const component = 'Tips'
const store = indexStore()
let tips = reactive([
  {
    name: {
      zh: '邮件尺寸一般是多少?',
      en: 'What is the typical size of the email?'
    } as I18n,
    infos: [
      {
        zh: '一般来说电子邮件的尺寸不做任何规范,长度任意,但建议宽度如下:',
        en: 'Generally speaking, the size of emails is not standardized and the length is arbitrary, but the recommended width is as follows:'
      } as I18n,
      {
        zh: '1. 1200px:大邮件,例如个人简历,公司介绍,产品介绍',
        en: '1. 1200px: Large email, such as personal resume, company introduction, product introduction'
      } as I18n,
      {
        zh: '2. 900px:常用较大尺寸,例如感谢信,个人名片',
        en: '2. 900px: Commonly used larger sizes, such as thank-you letters and personal business cards'
      } as I18n,
      {
        zh: '3. 720px:常用中等尺寸',
        en: '3. 720px: commonly used medium size'
      } as I18n,
      {
        zh: '4. 600px:小尺寸邮件',
        en: '4. 600px: Small size email'
      } as I18n
    ]
  },
  {
    name: {
      zh: '为什么图片无法显示?',
      en: 'Why can not the picture be displayed?'
    } as I18n,
    infos: [
      {
        zh: '图片的大小可能会导致图片无法显示,建议图片大小如下:',
        en: 'Why can not the picture be displayed?'
      } as I18n,
      {
        zh: '1KB~1.5MB',
        en: '1KB~1.5MB'
      } as I18n,
      {
        zh: '建议图片格式如下:',
        en: 'The recommended image format is as follows:'
      } as I18n,
      {
        zh: '1. png,2. svg,3. jpg',
        en: '1. png,2. svg,3. jpg'
      } as I18n
    ]
  },
  {
    name: {
      zh: '为什么模板|组件商店无法下载?',
      en: 'Why is the template | component store unable to download?'
    } as I18n,
    infos: [
      {
        zh: '所有的下载是基于GitHub的,从GitHub下载失败的原因有很多,比如网络问题、防火墙问题、代理问题等等',
        en: 'All downloads are based on GitHub. There are many reasons for the failure of downloading from GitHub, such as network problems, firewall problems, Principal–agent problem, etc'
      } as I18n,
      {
        zh: '1. 检查您的网络连接是否正常，或者尝试更换网络环境',
        en: '1. Check whether your network connection is normal, or try to change the network environment'
      } as I18n,
      {
        zh: '2. 检查您的防火墙设置，确保没有阻止GitHub的访问',
        en: '2. Check your firewall settings to ensure that GitHub access is not blocked'
      } as I18n,
      {
        zh: '3. 如果您使用了代理服务器，请检查代理服务器的设置是否正确',
        en: '3. If you have used a proxy server, please check if the proxy server settings are correct'
      } as I18n
    ]
  },
  {
    name: {
      zh: '我该去哪里下载资源?',
      en: 'Where should I go to download resources?'
    } as I18n,
    infos: [
      {
        zh: '软件:https://github.com/syf20020816/EStylist',
        en: 'Software:https://github.com/syf20020816/EStylist'
      } as I18n,
      {
        zh: '资源:https://github.com/syf20020816/EStylist-TemplateLib',
        en: 'Resource:https://github.com/syf20020816/EStylist-TemplateLib'
      } as I18n
    ]
  }
])

const toNext = (index: number) => {
  tips.splice(index, 1)
}
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'Tips';

@include buildView($component) {
  height: inherit;
  width: inherit;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  box-sizing: border-box;
  padding-bottom: 32px 0;
  .el-card {
    margin-bottom: 16px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 6px;
  }

  .box-card {
    width: 96%;
  }
}
</style>