<template>
    <div>
      <div class="add d-flex justify-content-end">
        <router-link :to="{ name: 'add_pasien' }" type="button" class="btn btn-primary">Add Pasien</router-link>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pasien</th>
              <th>Tanggal_Lahir</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Nomer Telepon</th>
              <th>Asuransi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in doctors" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ person.nama }}</td>
              <td>{{ person.tanggal_lahir }}</td>
              <td>{{ person.jenis_kelamin }}</td>
              <td>{{ person.alamat }}</td>
              <td>{{ person.nomor_telepon }}</td>
              <td>{{ person.asuransi }}</td>
              <td>
                <button type="button" class="btn btn-danger mx-1" @click="confirmDelete(person.id_pasien)">Hapus</button>
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
        doctors: [],
        error: null
      };
    },
    created() {
      this.fetchPasien();
    },
    methods: {
      async fetchPasien() {
        try {
          const response = await fetch('http://localhost:3000/pasien'); // Ganti dengan endpoint API Anda
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.doctors = data;
        } catch (error) {
          this.error = 'Error fetching data: ' + error.message;
          console.error('Error fetching data:', error);
        }
      },
      confirmDelete(id_pasien) {
        if (window.confirm("Apakah Anda yakin akan menghapus data ini?")) {
          this.deletePasien(id_pasien);
        }
      },
      async deletePasien(id_pasien) {
        try {
          const response = await fetch(`http://localhost:3000/pasien/${id_pasien}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          window.alert("Data berhasil dihapus");
          this.reloadData(); // Memuat ulang data dokter setelah penghapusan
        } catch (error) {
          this.error = 'Error deleting data: ' + error.message;
          console.error('Error deleting data:', error);
        }
      },
      reloadData() {
        this.fetchPasien();
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
  