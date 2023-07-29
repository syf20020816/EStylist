<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <img @click="toPage('')" src="./assets/EStylist.png" alt="" style="height: 40px;width: 40px;border-radius: 50%;filter: drop-shadow(0 0 16px #8fa2f8);cursor: pointer;">
      <div :class="buildWrap(component,'nav-top')">
        <el-tooltip class="box-item" effect="dark" content="模板编辑" placement="right">
          <el-icon size="20" @click="toPage('edit')">
            <Edit />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="组件超市" placement="right">
          <el-icon size="20" @click="toPage('componentLib')">
            <Shop />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="模板超市" placement="right">
          <el-icon size="20" @click="toPage('templateLib')">
            <Box />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="邮件发送" placement="right">
          <el-icon size="20" @click="toPage('send')">
            <Message />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="文档教程" placement="right">
          <el-icon size="20" @click="toPage('doc')">
            <Document />
          </el-icon>
        </el-tooltip>
      </div>
      <div :class="buildWrap(component,'nav-bottom')">
        <el-tooltip class="box-item" effect="dark" content="更新信息" placement="right">
          <el-icon size="20" @click="toPage('info')">
            <InfoFilled />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="设置" placement="right">
          <el-icon size="20" @click="toPage('setting')">
            <Tools />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { build, buildView, buildWrap } from './styles/name'
import { Edit, Message, InfoFilled, Tools, Document, Box, Shop } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { invoke } from '@tauri-apps/api'
import { ElMessage } from 'element-plus'
import { indexStore } from './store/IndexPinia'

const store = indexStore()
const component = 'TaApp'
const router = useRouter()
const toPage = (url: string) => {
  router.push({ path: '/' + url })
}

onBeforeMount(() => {
  //initialize
  invoke('init')
    // `invoke` 返回的是一个 Promise
    .then((res: any) => {
      store.settings = JSON.parse(res)

      if (store.settings.auto) {
        invoke('load_templates').then((res: any) => {
          store.templates = res
        })
      }
    })

  ElMessage({
    message: 'init successfully!',
    type: 'info'
  })
})
</script>

<style lang="scss" scoped>
@use './styles/name.scss' as *;
@use './styles/src/var.scss' as *;

$component: 'TaApp';

@include buildView($component) {
  height: inherit;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include buildWrap($component, 'left') {
    position: relative;
    height: inherit;
    width: 60px;
    box-sizing: border-box;
    padding: 12px 6px;
    background-color: $bg-color-dark-deep;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    .el-icon {
      margin: 16px;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      &:hover {
        filter: drop-shadow(0 0 4px $force-color) brightness(1.5);
        transform: scale(0.9);
      }
    }
    @include buildWrap($component, 'nav-top') {
      position: absolute;
      top: 60px;
      height: auto;
      width: inherit;
      display: flex;
      justify-content: center;
      align-content: space-around;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    @include buildWrap($component, 'nav-bottom') {
      position: absolute;
      bottom: 0;
    }
  }
  @include buildWrap($component, 'right') {
    height: inherit;
    width: calc(100% - 60px);
  }
}
</style>
