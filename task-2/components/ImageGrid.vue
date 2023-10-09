<template>
  <ImageCount :countsImages="images.length"/>
  <div class="images__grid">
    <div class="grid">
      <div 
        class="grid-item"
        v-for="image in images"
        :key="image.id"
        @click="showModalImage(image.src, image.alt)">
        <image-item
          :src="image.src"
          :alt="image.alt"
        
        />
      </div>
    </div>
  </div>
  <ImageModal :src="srcModal" :alt="altModal" @close="closeModalImage" v-if="isModalImageOpen"/>
</template>

<script setup>
  let srcModal = ref(null);
  let altModal = ref(null);
  let isModalImageOpen = ref(false);

  const images=[
    {id: 1, src: '/images/1.jpg', alt: '1'},
    {id: 2, src: '/images/2.jpg', alt: '2'},
    {id: 3, src: '/images/3.jpg', alt: '3'},
    {id: 4, src: '/images/4.jpg', alt: '4'},
    {id: 5, src: '/images/5.jpg', alt: '5'},
    {id: 6, src: '/images/6.jpg', alt: '6'},
    {id: 7, src: '/images/7.jpg', alt: '7'},
    {id: 8, src: '/images/8.jpg', alt: '8'},
    {id: 9, src: '/images/9.jpg', alt: '9'},
    {id: 10, src: '/images/10.jpg', alt: '10'},
    {id: 11, src: '/images/11.jpg', alt: '11'},
    {id: 12, src: '/images/12.jpg', alt: '12'},
  ]

  function showModalImage(src, alt){
    srcModal.value = src;
    altModal.value = alt;
    isModalImageOpen.value = true;
  }
  function closeModalImage(){
    isModalImageOpen.value = false;
  }
</script>

<style lang="scss" scoped>
  .images__grid{
    display: flex;
    justify-content: center;
    align-items: center;
    .grid{
      padding: 0 40px;
      display: grid;
     
      grid-gap: 5px;
      @media (min-width: 901px) {
        width: 80%;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);
        .grid-item:nth-child(4n+1){
          .image-item {
            border-color: red;
          }
        }
      }
      @media (min-width: 501px) and (max-width: 900px) {
        width: 100%;
        min-width: 100vw;
        grid-auto-flow: column;
        overflow-x: auto;
        grid-auto-columns: calc(100% - 40vw);
        grid-template-rows: repeat(2, 200px);
        .grid-item{
          &:nth-child(1),
          &:nth-child(2){
            .image-item {
              border-color: red;
            }
          }
        }
      }
      @media (max-width: 500px) {
        width: 100%;
        min-width: 100vw;
        grid-auto-flow: column;
        overflow-x: auto;
        grid-auto-columns: calc(100% - 30vw);
        grid-template-rows: repeat(1,200px);
        .grid-item{
          &:nth-child(1){
            .image-item {
              border-color: red;
            }
          }
        }
      }
      .grid-item{
        transition: transform 0.3s ease;
        &:hover{
          cursor: pointer;
          @media (min-width: 901px) {
            transform: rotate(45deg);
          }
          .image-item{
            z-index: 10;
            position: relative;
            border-color: yellow !important;

          }
        }
      }
    }
  }
</style>