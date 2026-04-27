<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b px-6 py-4">
      <nav class="max-w-5xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="font-bold text-xl">
          Nazwa Ośrodka
        </NuxtLink>
        <div class="flex gap-6">
          <NuxtLink to="/warsztaty">Warsztaty</NuxtLink>
          <NuxtLink to="/o-nas">O nas</NuxtLink>
          <NuxtLink to="/kontakt">Kontakt</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t px-6 py-8 text-center text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Nazwa Ośrodka
    </footer>
  </div>
</template>