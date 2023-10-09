<template>
  <div class="image-item">
    <img
      :src="src"
      :alt="alt"
    />
  </div>

</template>

<script setup>
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt:{
      type: String,
      required: false,
    }
  });

</script>

<style lang="scss" scoped>
  .image-item{
    height: 100%;
    border: 5px solid $color-border-grey;
    border-radius: 10px;
    transition: border-color 0.3s ease;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
      transition: transform 0.3s ease;
      object-fit: cover;
      overflow: hidden;
      @media (max-width: 900px) {
        &:hover{
          transform: scale(1.2);  
        }
      }
    }
  }
</style>