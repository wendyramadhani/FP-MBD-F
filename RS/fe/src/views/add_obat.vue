<template>
    <div>
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
              <span class="input-group-text" id="basic-addon1" for="nama_dokter">Nama obat</span>
              <input type="text" class="form-control" v-model="nama_obat">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1" for="spesialisasi">Deskripsi</span>
              <input type="text" class="form-control" v-model="deskripsi">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1" for="jadwal">Stock</span>
              <input type="text" class="form-control" v-model="stock">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1" for="nomor_telepon">harga</span>
              <input type="text" class="form-control" v-model="harga">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nama_obat: '',
        deskripsi: '',
        stock: '',
        harga: '',
        successMessage: '',
        errorMessage: '',
        isSubmitting: false
      };
    },
    methods: {
      async submitForm() {
        if (this.isSubmitting) return;
        this.isSubmitting = true;
  
        const url = 'http://localhost:3000/obat';
        const data = {
          nama_obat: this.nama_obat,
          deskripsi: this.deskripsi,
          stok: this.stock,
          harga: this.harga
        };
        console.log(data);
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const responseData = await response.json();
          this.successMessage = 'Data telah dimasukkan';
          this.errorMessage = '';
          this.resetForm();
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'Error: ' + error.message;
          this.successMessage = '';
        } finally {
          this.isSubmitting = false;
        }
      },
      resetForm() {
        this.nama_obat = '';
        this.deskripsi = '';
        this.stock = '';
        this.harga = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles you need here */
  </style>
  