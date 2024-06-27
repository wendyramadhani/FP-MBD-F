<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="card p-3" style="width: auto;">
      <form @submit.prevent="submitForm">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nama">Total Biaya</span>
          <input type="text" class="form-control" v-model="pembayaran.Biaya" readonly>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nama">Metode Pembayaran</span>
          <select class="form-control" v-model="pembayaran.Metode_Pembayaran">
            <option value="Tunai">Tunai</option>
            <option value="Non-Tunai">Non Tunai</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary btn-block form-control">Simpan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../assets/js/script';
export default {
  data() {
    return {
      pembayaran: {},
      errorMessages: null,
    }
  },
  created() {
    this.fetchPembayaran();
  },
  methods: {
    async fetchPembayaran() {
      try {
        const response = await fetch(`http://localhost:3000/pembayaran/${this.$route.params.id_pembayaran}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const pembayaranData = await response.json();
        // console.log('Raw pembayaranData:', pembayaranData);

        if (Array.isArray(pembayaranData) && pembayaranData.length > 0) {
          const pembayaran = pembayaranData[0];
          // console.log('First item of pembayaranData:', pembayaran);

          this.pembayaran = pembayaran;
          // console.log('Assigned this.pembayaran:', this.pembayaran);
          // console.log('Biaya:', this.pembayaran.Biaya);
          // console.log('Metode_Pembayaran:', this.pembayaran.Metode_Pembayaran);
          // console.log('Tanggal_Pembayaran:', this.pembayaran.Tanggal_Pembayaran);

        } else {
          throw new Error('No data found');
        }
        // console.log(this.pembayaran.Biaya);
      } catch (error) {
        this.errorMessages = `Error: ${error}`;
      }
    },
    async submitForm() {
      try {
        const pembayaran = this.pembayaran;
        pembayaran.Biaya = this.pembayaran.Biaya;
        
        const currentDate = new Date().toISOString();
        pembayaran.Tanggal_Pembayaran = formatDate(currentDate);

        // console.log('Sent: ', pembayaran);
        console.log(JSON.stringify(pembayaran));
        const response = await fetch(`http://localhost:3000/pembayaran/${this.$route.params.id_pembayaran}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            biaya: pembayaran.Biaya,
            metode_pembayaran: pembayaran.Metode_Pembayaran,
            tanggal_pembayaran: pembayaran.Tanggal_Pembayaran
          }),
        });

        if (!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        this.$router.push('/pembayaran');
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    },
    formatDate,
  }
}

</script>