<template>
  <q-page padding>
    <!-- Tablica s podacima o knjigama -->
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>Popis knjiga</q-toolbar-title>
        </q-toolbar>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      // Dummy podaci za knjige
      books: [
        { id: 1, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction' },
        { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction' },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', year: 1851, genre: 'Adventure' },
        { id: 5, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869, genre: 'Historical' },
      ],

      // Definicija kolona u tablici
      columns: [
        { name: 'title', label: 'Naziv knjige', align: 'left', field: row => row.title },
        { name: 'author', label: 'Autor', align: 'left', field: row => row.author },
        { name: 'year', label: 'Godina izdavanja', align: 'center', field: row => row.year },
        { name: 'genre', label: 'Žanr', align: 'left', field: row => row.genre },
      ],

      // Pagination (ako je potrebno)
      pagination: {
        rowsPerPage: 5,
      },
    };
  },
};
</script>

