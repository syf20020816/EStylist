<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <el-avatar @click="toPage('')"> 🦀 </el-avatar>
      <div :class="buildWrap(component,'nav-top')">
        <el-icon size="20" @click="toPage('edit')">
          <Edit />
        </el-icon>
        <el-icon size="20" @click="toPage('send')">
          <Message />
        </el-icon>
      </div>
      <div :class="buildWrap(component,'nav-bottom')">
        <el-icon size="20" @click="toPage('info')">
          <InfoFilled />
        </el-icon>
        <el-icon size="20" @click="toPage('setting')">
          <Tools />
        </el-icon>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { build, buildView, buildWrap } from './styles/name'
import { Edit, Message, InfoFilled, Tools } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const component = 'TaApp'
const router = useRouter()
const toPage = (url: string) => {
  router.push({ path: '/' + url })
}
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
