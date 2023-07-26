<template>
  <div>
    <div>
      <div class="divClasses" v-for="item,index in lists" :key="index" @click="addBorder(index)">
        <span>{{ item.name }}</span>
        <button @click="del(index)">删除</button>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
export default {
  name: 'ModelRep'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
let lists = reactive([{ name: 'node1' }, { name: 'node2' }, { name: 'node3' }, { name: 'node4' }])
let flag = ref(true)
const del = (index: number) => {
  lists.splice(index, 1)
}
const addBorder = (index: number) => {
  flag.value = !flag.value
  let dom: any = document.getElementsByClassName('divClasses')[index]
  if (flag.value) {
    dom.style.border = '1px solid #fff'
  } else {
    dom.style.border = '0px'
  }
}
</script>

<style lang="scss" scoped>
</style>