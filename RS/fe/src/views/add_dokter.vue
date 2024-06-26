<template>
  <div v-if="successMessage" class="alert alert-success">
    {{ successMessage }}
  </div>
  <div v-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
  </div>
  <div class="d-flex justify-content-center mt-3">
    <div class="card p-3" style="width: auto;">
      <form @submit.prevent="submitForm">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nama_dokter">Nama dokter</span>
          <input type="text" class="form-control" v-model="nama_dokter">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="spesialisasi">Spesialisasi</span>
          <input type="text" class="form-control" v-model="spesialisasi">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="jadwal">Jadwal</span>
          <input type="text" class="form-control" v-model="jadwal">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nomor_telepon">No Telepon</span>
          <input type="text" class="form-control" v-model="nomor_telepon">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nama_dokter: '',
      spesialisasi: '',
      jadwal: '',
      nomor_telepon: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      const url = 'http://localhost:3000/dokter';
      const data = {
        nama_dokter: this.nama_dokter,
        spesialisasi: this.spesialisasi,
        jadwal: this.jadwal,
        nomor_telepon: this.nomor_telepon
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        this.successMessage = 'Data telah dimasukkan';
        this.errorMessage = '';
        this.clearForm();
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Error: ' + error.message;
        this.successMessage = '';
      }
    },
    clearForm() {
      this.nama_dokter = '';
      this.spesialisasi = '';
      this.jadwal = '';
      this.nomor_telepon = '';
    }
  }
};
</script>

<style>
/* Add any custom styles you need here */
</style>
