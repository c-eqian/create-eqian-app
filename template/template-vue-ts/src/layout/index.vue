<script lang="ts" setup>
import AppAside from '@/layout/AppAside.vue';
import AppHeader from '@/layout/AppHeader.vue';
</script>

<template>
  <section class="cz-h-full">
    <el-container class="cz-h-full">
      <el-aside
        width="200px"
        class="zk-h-full cz-bg-blue-100"
      >
        <AppAside />
      </el-aside>
      <el-container>
        <el-header class="cz-bg-blue-300"><AppHeader /></el-header>
        <el-main class="cz-bg-sky-50">
          <transition
            mode="out-in"
            name="fade-transform"
          >
            <main
              v-show="true"
              class="custom-main cz-h-full cz-flex-1"
            >
              <router-view
                v-slot="{ Component, route }"
              >
                <keep-alive>
                  <component
                    :is="Component"
                    v-if="Component"
                    :key="route.fullPath"
                  />
                </keep-alive>
              </router-view>
            </main>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>

<style lang="scss" scoped>
</style>
