<template>
  <div :id="buildView(component)">
    <div class="title">
      {{ getStr(store.settings.language,pagei18n.edit.starContribute) }}
    </div>
    <div class="tips">

      <a href="https://github.com/syf20020816/EStylist" target="_blank">{{ getStr(store.settings.language,pagei18n.buttons.star.project) }}</a>
      <a href="https://github.com/syf20020816/EStylist-TemplateLib" target="_blank">{{ getStr(store.settings.language,pagei18n.buttons.star.lib) }}</a>
      <div class="a" @click="toPage">{{ getStr(store.settings.language,pagei18n.buttons.star.learn) }}</div>
      <a href="https://github.com/syf20020816/EStylist-TemplateLib" target="_blank">{{ getStr(store.settings.language,pagei18n.buttons.star.contribute) }}</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StarContribute'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { buildWrap, build, buildView } from '../../styles/name'
import { indexStore } from '../../store/IndexPinia'
import { useRouter } from 'vue-router'
import { getStr, pagei18n } from '../../core'

const router = useRouter()
const component = 'StarContribute'
const store = indexStore()
const toPage = () => {
  router.push({ path: '/doc' })
}
</script>

<style lang="scss" scoped>
@use '../../styles/name.scss' as *;

$component: 'StarContribute';

@include buildView($component) {
  height: inherit;
  width: inherit;
  box-sizing: border-box;
  padding: 6px;
  border-top: 1px solid #fff;

  .title {
    height: 36px;
    font-size: 2vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
  }
  .tips {
    font-size: 14px;
    height: calc(100% - 36px);
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    a {
      margin: 0;
      width: 90%;
      display: inline-block;
      height: 2.5em;
      background-color: #263d48;
      color: #fff;
      line-height: 2.5em;
      text-align: center;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
    }
    .a {
      cursor: pointer;
      margin: 0;
      width: 90%;
      display: inline-block;
      height: 2.5em;
      font-size: 14px;
      overflow: hidden;
      background-color: #263d48;
      color: #fff;
      line-height: 2.5em;
      text-align: center;
      border-radius: 4px;
    }
  }
}
</style>