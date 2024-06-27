<template>
    <div>
      <div class="add d-flex justify-content-end">
        <router-link :to="{ name: 'add_obat' }" type="button" class="btn btn-primary">Add Obat</router-link>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>ID obat</th>
              <th>Nama Obat</th>
              <th>Deskripsi</th>
              <th>Stock</th>
              <th>harga</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in obat" :key="item.id_obat">
              <td>{{ item.id_obat }}</td>
              <td>{{ item.nama_obat }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>{{ item.stok }}</td>
              <td>{{ item.harga }}</td>
              <td>
                <router-link :to="{ name: 'edit_obat',params:{id_obat : item.id_obat} }" class="btn btn-primary mx-1">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        obat: [],
        error: null
      };
    },
    created() {
      this.fetchObat();
    },
    methods: {
      async fetchObat() {
        try {
          const response = await fetch('http://localhost:3000/obat'); // Ganti dengan endpoint API Anda
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.obat = data;
          console.log(this.obat)
        } catch (error) {
          this.error = 'Error fetching data: ' + error.message;
          console.error('Error fetching data:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 80%;
    margin: auto;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .table th, .table td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  .table th {
    background-color: #f2f2f2;
  }
  .add {
    margin-top: 30px;
    margin-right: 150px;
  }
  </style>
  