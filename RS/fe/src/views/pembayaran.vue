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
            <th>Biaya</th>
            <th>Metode Pembayaran</th>
            <th>Tanggal Pembayaran</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pay, index) in pembayaran" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ pay.biaya }}</td>
            <td>{{ pay.metode_pembayaran }}</td>
            <td>{{ pay.tanggal_pembayaran }}</td>
            <td>
              <!-- <router-link :to="{ name: 'edit_pasien', params: { id_pasien: pay.id_pasien } }" class="btn btn-primary mx-1">Edit</router-link> -->
              <button type="button" class="btn btn-danger mx-1" @click="confirmDelete(pay.id_pasien)">Hapus</button>
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
      pembayaran: {},
      error: null,
    }
  },
  created() {
    this.fetchPembayaran();
  },
  methods: {
    async fetchPembayaran() {
      try {
        const response = await fetch('http://localhost:3000/pembayaran');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        this.pembayaran = data;
      } catch (error) {
        this.error = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    }
  }
}

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
