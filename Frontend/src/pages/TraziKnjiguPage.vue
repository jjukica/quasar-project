<template>
  <q-page padding>
    <!-- Pretraživanje -->
    <q-toolbar>
      <q-toolbar-title>Pretraži knjige</q-toolbar-title>
    </q-toolbar>
    
    <div class="q-mb-md">
      <!-- Input za pretragu -->
      <q-input
        v-model="searchQuery"
        label="Unesite pojam za pretragu"
        outlined
        debounce="300"
        class="q-mb-md"
      />

      <!-- Odabir pretrage po autoru ili naslovu -->
      <div class="q-mb-md">
        <q-checkbox
          v-model="searchByAuthor"
          label="Pretražuj po autoru"
          color="primary"
        />
        <q-checkbox
          v-model="searchByTitle"
          label="Pretražuj po naslovu"
          color="primary"
        />
      </div>

      <!-- Gumb za pokretanje pretrage -->
      <q-btn @click="searchBooks" label="Traži" color="primary" />
    </div>

    <!-- Tablica s popisom knjiga -->
    <q-table
      :rows="filteredBooks"
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
  name: 'BooksPage',

  data() {
    return {
      searchQuery: '', // Unos za pretragu
      searchByAuthor: false, // Checkbox za pretragu po autoru
      searchByTitle: true, // Checkbox za pretragu po naslovu (default)
      
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
      
      // Filtrirani podaci za tablicu
      filteredBooks: [],
    };
  },

  methods: {
    // Funkcija za pretragu
    searchBooks() {
      if (!this.searchQuery) {
        // Ako nije uneseno ništa u pretragu, vratiti sve knjige
        this.filteredBooks = this.books;
        return;
      }
      
      this.filteredBooks = this.books.filter(book => {
        let matches = false;

        // Pretražujemo prema odabiru (naslov ili autor)
        if (this.searchByTitle && book.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          matches = true;
        }
        if (this.searchByAuthor && book.author.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          matches = true;
        }

        return matches;
      });
    },
  },

  // Kada se stranica učita, automatski filtriraj sve knjige (ako nema pretrage)
  mounted() {
    this.filteredBooks = this.books;
  },
};
</script>
