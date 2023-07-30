<template>
  <div :id="buildView(component)">
    <el-card class="box-card" v-for="item,index in tips" :key="index">
      <template #header>
        <div class="card-header">
          <span>{{item.name}}</span>
          <el-button class="button" type="primary" :icon="Finished" @click="toNext(index)">我懂了</el-button>
        </div>
      </template>
      <div v-for="info,infoIndex in item.infos" :key="infoIndex" class="text item">{{ info }}</div>
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
const component = 'Tips'

let tips = reactive([
  {
    name: '邮件尺寸一般是多少?',
    infos: ['一般来说电子邮件的尺寸不做任何规范,长度任意,但建议宽度如下:', '1. 1200px:大邮件,例如个人简历,公司介绍,产品介绍', '2. 900px:常用较大尺寸,例如感谢信,个人名片', '3. 720px:常用中等尺寸', '4. 600px:小尺寸邮件']
  },
  {
    name: '为什么图片无法显示?',
    infos: ['图片的大小可能会导致图片无法显示,建议图片大小如下:', '1KB~1.5MB', '建议图片格式如下:', '1. png', '2. svg', '3. jpg']
  },
  {
    name: '为什么模板|组件商店无法下载?',
    infos: ['所有的下载是基于GitHub的,从GitHub下载失败的原因有很多,比如网络问题、防火墙问题、代理问题等等', '1. 检查您的网络连接是否正常，或者尝试更换网络环境', '2. 检查您的防火墙设置，确保没有阻止GitHub的访问', '3. 如果您使用了代理服务器，请检查代理服务器的设置是否正确']
  },
  {
    name: '我该去哪里下载资源?',
    infos: ['GitHub:https://github.com/syf20020816/EStylist']
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