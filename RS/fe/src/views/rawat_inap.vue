<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nama Pasien</th>
          <th>Nomor Kamar</th>
          <th>Tanggal Masuk</th>
          <th>Tanggal Keluar</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <td>{{ person.Nama }}</td>
          <td>{{ person.Nomor_Kamar }}</td>
          <td>{{ formatDate(person.Tanggal_Masuk) }}</td>
          <td>{{ formatDate(person.Tanggal_Keluar) }}</td>
          <td>
            <router-link :to="{ name: 'edit_pasien', params: { id: person.id } }" class="btn btn-primary mx-auto">edit</router-link>
            <button type="button" class="btn btn-danger mx-1">hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="add d-flex justify-content-center">
    <button type="button" class="btn btn-primary">Primary</button>
  </div>
  <div>
    <Dropdown/>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Dropdown from '../components/Dropdown.vue';
// import Dropdown from '../components/Dropdown.vue';
export default {
  data() {
    return {
      people: [],
      error: null
    };
  },
  components: {
    Dropdown
    },

  created() {
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:3000/rawat_inap'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.people = data;
      } catch (error) {
        this.error = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    },
    formatDate(dateTime) {
      if (!dateTime) return ''; // Handle cases where dateTime might be null or undefined
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
