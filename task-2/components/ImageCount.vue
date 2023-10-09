<template>
  <div class="images__now">
    Count: {{countsImages}}
  </div>
</template>

<script setup>
  const props = defineProps({
    countsImages: {
      type: Number,
      default: 0,
    },
  });
</script>

<style lang="scss" scoped>

</style>