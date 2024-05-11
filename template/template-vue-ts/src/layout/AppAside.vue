<script setup lang="ts">

import AsideMenu from '@/layout/AsideMenu.vue';

import { tempBackEndMenuList } from './use-menu';
import { useMenuToRoutes } from './use-menu/use-transform';

const routeList = computed(() => useMenuToRoutes(tempBackEndMenuList));
</script>

<template>
  <div>
    <AsideMenu :route-list="routeList" />
  </div>
</template>

<style scoped lang="scss">

</style>
