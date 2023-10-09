<template>
  <main class="app">
    <div class="counter">Marked: {{markedUniversities?.length}}</div>
    <form class="form" @submit.prevent="searchCountry()">
      <input type="text" class="countryInput" v-model="countryInput" placeholder="Enter name country">
      <button type="submit" class="searchButton">Search</button>
      <button class="resetButton" @click="resetForm()">Reset</button>
    </form>

      <div class="universityTable">
      <table v-if="universities.length != 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Website</th>
            <th>Country</th>
            <th><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAh0lEQVR4nO3UwQmAMAyF4beHdRO9Ky7l0YHEgdQ9Ij0I0oNNQopI80MOhZYPcijg1dgE4ARAj3krvXOfZyl8JKgWFuNkCMdZvoLZOBWAqQTMeU/ahx0T7a1hMphsDlN1q14BNOAXAGwWcIC81gLW5nA2X7U28eaOAp/HzoFHYzyig3pv3m+7AKg9J4Kk0mDnAAAAAElFTkSuQmCC"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(university, index) in universities" :key="university.name">
            <td>{{ index + 1 }}</td>
            <td>{{ university.name }}</td>
            <td><a :href="university.web_pages[0]" target="_blank">{{ university.web_pages[0] }}</a></td>
            <td>{{ university.country }}</td>
            <td>
              <input type="checkbox" 
              class="checkbox" 
              :value="university" 
              v-model="markedUniversities"></td>
          </tr>
        </tbody>
      </table>
      <div v-else>No universities found for this country. Check right name country.</div>
    </div>
  </main>
</template>

<script setup>
  let countryInput = ref(null);
  const markedUniversities = ref([])
  const universities = ref([]);
  onMounted(()=>{
    if (localStorage.getItem("markedUniversitiesData")){
      loadMarkedUniversitiesData();
    }
  })
  watch(markedUniversities, (newVal, oldVal) => {
    updateMarkedUniversitiesData()
  });
  async function searchCountry(){
    if (countryInput.value.trim() === "") {
      alert('Please enter a country name.');
      return;
    }
    try{
      const response = await fetch(`http://universities.hipolabs.com/search?country=${countryInput.value}`)
      const data = await response.json();
      universities.value = data;
      
    }catch{
      console.error('Error fetching data:', error);
      universities.value = [];
    }
  }
  function resetForm(){
    countryInput.value = null;
    universities.value = [];
    markedUniversities.value = []
    localStorage.removeItem("markedUniversitiesData");
  }
  function updateMarkedUniversitiesData(){
    localStorage.setItem("markedUniversitiesData", JSON.stringify(markedUniversities))
  }
  function loadMarkedUniversitiesData(){
    markedUniversities.value = JSON.parse(localStorage.getItem("markedUniversitiesData"))._value;
    universities.value = JSON.parse(localStorage.getItem("markedUniversitiesData"))._value;
  }

</script>

<style lang="scss" scoped>
  .app{
    display: flex;
    padding: 50px 0;
    align-items: center;
    .form{
      display: flex;
      gap: 10px;
      margin: 10px 0px 20px;
    }

    .countryInput{
      padding: 5px 10px;
      border: 1px solid $color-black-content;
      border-radius: 10px;
    }
    .universityTable{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button {
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      &.searchButton{
        background: $color-blue;
        color: white;
      }
      &.resetButton{

        background: $color-red;
      }
    }
    table {
      border-collapse: collapse;
      width: 80%;
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        &:last-child{
          text-align: center;
   
        }
        img{
          vertical-align: sub;
        }
      }
      td{
        &:last-child{
          text-align: center;
          input[type='checkbox']{
            cursor: pointer;
          }
        }
      }
    }
    a {
      text-decoration: none;
      color: blue;
    }
  }
</style>