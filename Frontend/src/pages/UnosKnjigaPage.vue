<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="naslov" label="Naslov knjige *" />
      <q-input filled v-model="autor" label="Autor *" />
      <q-input filled v-model="opis" label="Opis *" />
      <q-input filled v-model="slika" label="URL slike *" />
      <q-input filled v-model="stanje" label="Broj knjiga *" type="number" />
      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const naslov = ref(null);
    const autor = ref(null);
    const opis = ref(null);
    const slika = ref(null);
    const stanje = ref(null);

    const onSubmit = async () => {
      try {
        const bookData = {
          naslov: naslov.value,
          autor: autor.value,
          opis: opis.value,
          slika: slika.value,
          stanje: parseInt(stanje.value)  // Ensure "stanje" is an integer
        };

        // Send the data to the backend
        const response = await axios.post('http://localhost:3000/api/knjige', bookData);
        
        console.log('Book added:', response.data);
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book:', error);
        alert('Error adding book');
      }
    };

    const onReset = () => {
      naslov.value = '';
      autor.value = '';
      opis.value = '';
      slika.value = '';
      stanje.value = '';
    };

    return {
      naslov,
      autor,
      opis,
      slika,
      stanje,
      onSubmit,
      onReset,
    };
  }
};
</script>
