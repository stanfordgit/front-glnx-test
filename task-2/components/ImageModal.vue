<template>
  <Teleport to="body">
    <div class="image-modal">
      <div class="close" @click="closeModalImage">x</div>
      <img class="image" :src="src" :alt="alt"/>
    </div>
  </Teleport>
</template>

<script setup>
 const props = defineProps({
    src:{
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits(['close'])
  function closeModalImage() {
    emit('close');
  }
</script>

<style lang="scss" scoped>
  .image-modal{
    display: flex;
    position: fixed;
    z-index: 100; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto;
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.9); 
    .close{
      position: absolute;
      top: 15px;
      right: 35px;
      color: #f1f1f1;
      cursor: pointer;
      font-size: 40px;
      font-weight: bold;
      transition: 0.3s;
    }
    .image{
      margin: auto;
      display: block;
      width: 80%;
      max-width: 700px;
      -webkit-animation-name: zoom;
      -webkit-animation-duration: 0.6s;
      animation-name: zoom;
    }
    @-webkit-keyframes zoom {
      from {-webkit-transform:scale(0)} 
      to {-webkit-transform:scale(1)}
    }

    @keyframes zoom {
      from {transform:scale(0)} 
      to {transform:scale(1)}
    }
  }
</style>