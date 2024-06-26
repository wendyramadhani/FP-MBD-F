<template>
  <div>
    <div class="add d-flex justify-content-end">
      <router-link :to="{ name: 'add_dokter' }" type="button" class="btn btn-primary">Add Data</router-link>
    </div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Jenis Kelamin</th>
            <th>Tanggal Diperiksa</th>
            <th>Diagnosis</th>
            <th>Nama Dokter</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pasien, index) in pasienData" :key="pasien.id_pasien">
            <td>{{ index + 1 }}</td>
            <td>{{ pasien.nama }}</td>
            <td>{{ pasien.jenis_kelamin }}</td>
            <td>{{ formatDate(pasien.Tanggal_Diperiksa) }}</td>
            <td>{{ pasien.Diagnosis }}</td>
            <td>{{ pasien.nama_dokter }}</td>
            <td>
              <button type="button" class="btn btn-primary mx-auto">edit</button>
              <button type="button" class="btn btn-danger mx-1">hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <Dropdown/>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Dropdown from '../components/Dropdown.vue';
// import Dropdown from '../components/Dropdown.vue';
export default {
  data() {
    return {
      pasienData: [],
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
        const response = await fetch('http://localhost:3000/rawat_jalan'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.pasienData = data;
        console.log(this.pasienData);
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
