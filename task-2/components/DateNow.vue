<template>
  <div class="date-now">
    {{ formattedDateTime }}
  </div>
</template>

<script setup>
  let formattedDateTime = ref('--.--.---- --:--')
  function updateDateTime() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      formattedDateTime.value = `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
  })
  onUnmounted(()=>{
    clearInterval(updateDateTime);
  })
</script>

<style lang="scss" scoped>

</style>