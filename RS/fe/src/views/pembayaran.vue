<template>
  <div>
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
            <td v-if="pay.metode_pembayaran">{{ pay.metode_pembayaran }}</td>
            <td v-else>Belum dibayar</td>
            <td v-if="pay.tanggal_pembayaran">{{ formatDate(pay.tanggal_pembayaran) }}</td>
            <td v-else>-</td>
            <td>
              <router-link v-if="!pay.metode_pembayaran" :to="{ name: 'bayar', params: { id_pembayaran: pay.id_pembayaran } }" class="btn btn-success mx-1">Bayar</router-link>
              <div v-else>Sudah dibayar</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { formatDate } from '../assets/js/script';

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
    },
    formatDate
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
