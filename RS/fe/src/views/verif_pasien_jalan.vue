<template>
    <div class="d-flex justify-content-center mt-3">
      <div class="card p-3" style="width: auto;">
        <form @submit.prevent="submitForm">
          <div class="input-group mb-3">
            <label class="input-group-text" for="id_pasien">ID Pasien</label>
            <input type="text" class="form-control" id="id_pasien" v-model="id_pasien">
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
        id_pasien: '',
        errorMessage: '',
        successMessage: '',
        res: ''
      };
    },
    methods: {
      async submitForm() {
        const url = 'http://localhost:3000/utils/check_id';
        const data = {
          id_pasien: this.id_pasien,
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
  
          // Handle successful response here
          this.errorMessage = '';  // Clear any previous error message
          this.successMessage = 'Form submitted successfully!';
          const hasil = await response.json();
          JSON.stringify(hasil);
          this.res = hasil.result;
          console.log(this.res);
  
          if (this.res === 1) {
            this.errorMessage = '';
            this.successMessage = 'Patient exists';
            this.$router.push({ name: 'add_rawat_jalan', params: { id_pasien: this.id_pasien } });
          } else {
            this.errorMessage = 'Patient doesn\'t exist';
            this.successMessage = '';
            alert('Patient doesn\'t exist');  // Show alert if patient doesn't exist
            // this.$router.push('/edit_rawat_inap');
          }
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'Failed to submit. Please try again later.';
          this.successMessage = '';  // Clear any previous success message
          alert('Failed to submit. Please try again later.');  // Show alert if submission fails
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add any custom styles you need here */
  </style>
  