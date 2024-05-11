<script setup lang="ts">

import AsideMenuItem from '@/layout/AsideMenuItem.vue';

const isCollapse = ref(false);
const routeList = defineModel('routeList', {
  type: Array,
  default: []
});
const route = useRoute();
const activeMenu: any = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<template>
  <el-menu
    style="--el-menu-bg-color: transparent"
    :default-active="activeMenu"
    :ellipsis="false"
    router
    unique-opened
    :collapse="isCollapse"
  >
    <el-menu-item
      index="/index"
    >
      <el-icon>
        <cz-svg
          name="home"
        />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <AsideMenuItem :menu-item-list="routeList" />
  </el-menu>
</template>

<style scoped lang="scss">
:deep(.el-menu-item.is-active){
  //background: #9bc4fb;
}
</style>
