<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <AppNav />
    
    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>