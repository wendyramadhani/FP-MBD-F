<template>
  <div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nama Pasien</th>
            <th>Nomor Kamar</th>
            <th>Tanggal Lahir</th>
            <th>Jenis Kelamin</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Asuransi</th>
            <th>Tanggal Masuk</th>
            <th>Tanggal Keluar</th>
            <th>Dokter</th>
            <th>Spesialisasi</th>
            <th>Diagnosis</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people" :key="person.id">
            <td>{{ person.Nama }}</td>
            <td>{{ person.Nomor_Kamar }}</td>
            <td>{{ formatDate(person.Tanggal_Lahir) }}</td>
            <td>{{ person.Jenis_Kelamin }}</td>
            <td>{{ person.Alamat }}</td>
            <td>{{ person.Nomor_Telepon }}</td>
            <td>{{ person.Asuransi }}</td>
            <td>{{ formatDate(person.Tanggal_Masuk) }}</td>
            <td>{{ formatDate(person.Tanggal_Keluar) }}</td>
            <td>{{ person.dokter.nama_dokter }}</td>
            <td>{{ person.dokter.spesialisasi }}</td>

            <td>{{ person.Diagnosis }}</td>
            <td>
              <div class="d-flex justify-content-between">
                <div v-if="!person.Tanggal_Keluar">
                  <router-link :to="{ name: 'edit_rawat_inap', params: { id_pasien: person.Pasien_ID_Pasien } }" class="btn btn-primary mx-auto">Edit</router-link>
                </div>
                <button type="button" class="btn btn-danger mx-1">Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add d-flex justify-content-center">
      <router-link :to="{ name: 'add_rawat_inap' }" class="btn btn-primary">Tambah</router-link>
    </div>
    <div>
      <Dropdown />
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Dropdown from '../components/Dropdown.vue';

export default {
  data() {
    return {
      people: [],
      doctors: [],
      error: null,
    };
  },
  components: {
    Dropdown
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:3000/dokter');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.doctors = data;
      } catch (error) {
        this.error = 'Error fetching doctors data: ' + error.message;
        console.error('Error fetching doctors data:', error);
      }
    },
    async fetchData() {
      try {
        await this.fetchDoctors();

        const response = await fetch('http://localhost:3000/rawat_inap');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Map each patient with their corresponding doctor data
        this.people = data.map(person => {
          person.dokter = this.doctors.find(dokter => dokter.id_dokter === person.Dokter_ID_Dokter) || {};
          return person;
        });
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
  font-size: 0.85em; /* Adjust the font size here */
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
