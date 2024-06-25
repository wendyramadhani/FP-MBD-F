<template>
  <div>
    <div class="add d-flex justify-content-end">
      <router-link :to="{ name: 'add_dokter' }" type="button" class="btn btn-primary">Add Dokter</router-link>
    </div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID dokter</th>
            <th>Nama dokter</th>
            <th>Spesialisasi</th>
            <th>Jadwal</th>
            <th>Nomor Telepon</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in doctors" :key="person.id_dokter">
            <td>{{ person.id_dokter }}</td>
            <td>{{ person.nama_dokter }}</td>
            <td>{{ person.spesialisasi }}</td>
            <td>{{ person.jadwal }}</td>
            <td>{{ person.nomor_telepon }}</td>
            <td>
              <router-link :to="{ name: 'edit_dokter', params: { id: person.id_dokter } }" class="btn btn-primary mx-1">Edit</router-link>
              <button type="button" class="btn btn-danger mx-1" @click="confirmDelete(person.id_dokter)">Hapus</button>
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
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:3000/dokter'); // Ganti dengan endpoint API Anda
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
    confirmDelete(id) {
      if (window.confirm("Apakah Anda yakin akan menghapus data ini?")) {
        this.deleteDoctor(id);
      }
    },
    async deleteDoctor(id) {
      try {
        const response = await fetch(`http://localhost:3000/dokter/${id}`, {
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
      this.fetchDoctors();
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
