<template>
  <template
    v-for="item in menuItemList"
    :key="item.id + item.name"
  >
    <!--    是否有子菜单-->
    <el-sub-menu
      v-if="checkHasChildren(item) && !item.visible"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <cz-svg
            :name="item.icon"
          />
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <!--      递归调用本身-->
      <AsideMenuItem :menu-item-list="item.children" />
    </el-sub-menu>
    <!--    没有子菜单-->
    <el-menu-item
      v-else-if="!item.visible"
      :index="item.path"
    >
      <el-icon>
        <cz-svg
          :name="item.icon"
        />
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const menuItemList = defineModel('menuItemList', {
  type: Array as PropType<any[]>,
  default: []
});
const checkHasChildren = (item: any) => {
  return item && item?.children?.length > 0;
};
</script>

<style lang=scss scoped>

</style>
