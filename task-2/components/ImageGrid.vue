<template>

  <div class="images__grid">
    <ImageCount :countsImages="imagesCustom.length"/>
    <div class="grid" v-if="imagesCustom.length != 0">
      <div 
        class="grid-item"
        v-for="image in imagesCustom"
        :key="image.id">
        <image-item
          :src="image.src"
          :alt="image.alt"
          @click="showModalImage(image.src, image.alt)"
        />
        <button class="deleteImageButton" @click="deleteImageCustom(image.id)">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 40 40">
            <path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path>
          </svg>
        </button>
      </div>
      
    </div>
    <button class="recoverButton" @click="recoverImages()">Recover images</button>
  </div>
 
  <ImageModal :src="srcModal" :alt="altModal" @close="closeModalImage" v-if="isModalImageOpen"/>

</template>

<script setup>
  let srcModal = ref(null);
  let altModal = ref(null);
  let isModalImageOpen = ref(false);
  const imagesCustom=ref([])
  const imagesDefault=[
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
  onMounted(()=>{
    if (localStorage.getItem("imagesCustomData")){
      loadImagesCustomData();
    }
    else{
      recoverImages();
    }
  })
  watch(imagesCustom, (newVal, oldVal) => {
    updateImagesCustomData()
  });
  function recoverImages(){
    imagesCustom.value=[];
    for (var i of imagesDefault) {
      imagesCustom.value.push(i);
    }
  }
  function loadImagesCustomData(){
    imagesCustom.value = JSON.parse(localStorage.getItem("imagesCustomData"))._value;
  }
  function updateImagesCustomData(){
    localStorage.setItem("imagesCustomData", JSON.stringify(imagesCustom))
  }
  function showModalImage(src, alt){
    srcModal.value = src;
    altModal.value = alt;
    isModalImageOpen.value = true;
  }
  function closeModalImage(){
    srcModal.value = null;
    altModal.value = null;
    isModalImageOpen.value = false;
  }
  function deleteImageCustom(val){
    const filteredImages = imagesCustom.value.filter((image) => image.id !== val);
    imagesCustom.value=[];
    for (var i of filteredImages) {
      imagesCustom.value.push(i);
    }
  }
</script>

<style lang="scss" scoped>
  .images__grid{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
        grid-template-rows: repeat(1,auto);
        .grid-item{
          &:nth-child(1){
            .image-item {
              border-color: red;
            }
          }
        }
      }
      .grid-item{
        display: flex;
        flex-direction: column;
        .image-item{
          transition: transform 0.3s ease;
          &:hover{
            cursor: pointer;
            @media (min-width: 901px) {
              transform: rotate(45deg);
            }
            z-index: 10;
            border-color: yellow !important;
          }
        }
        .deleteImageButton{
          align-self: center;
          cursor: pointer;
          margin-top: 3px;
          background: transparent;
        }
      }
 
    }
    
    .recoverButton {
        padding: 5px 10px;
        border-radius: 10px;
        background: $color-blue;
        color: white;
        cursor: pointer;
    }
  }
</style>