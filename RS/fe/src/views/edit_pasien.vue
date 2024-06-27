<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="card p-3" style="width: auto;">
      <form @submit.prevent="submitForm">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nama">Nama Pasien</span>
          <input type="text" class="form-control" v-model="pasien.nama">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="tanggal_lahir">Tanggal Lahir</span>
          <input type="date" class="form-control" v-model="pasien.tanggal_lahir">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="jenis_kelamin">Jenis Kelamin</span>
          <select class="form-control" v-model="pasien.jenis_kelamin">
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="alamat">Alamat</span>
          <input type="text" class="form-control" v-model="pasien.alamat">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nomor_telepon">Nomor Telepon</span>
          <input type="text" class="form-control" v-model="pasien.nomor_telepon">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" for="nama">Asuransi</span>
          <select class="form-control" v-model="pasien.asuransi">
            <option value="1">Ada</option>
            <option value="0">Tidak Ada</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary btn-block form-control">Simpan</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pasien: {},
      successMessage: '',
      errorMessage: '',
    }
  },
  created() {
    this.fetchPasien();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async fetchPasien() {
      try {
        const response = await fetch(`http://localhost:3000/pasien/${this.$route.params.id_pasien}`);
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const pasienData = await response.json();
        if (Array.isArray(pasienData) && pasienData.length > 0) {
          const pasien = pasienData[0];
          pasien.tanggal_lahir = this.formatDate(pasien.tanggal_lahir);
          this.pasien = pasien;
        } else {
          throw new Error('No data found');
        }
        console.log(this.pasien.nama);
        // this.pasien = pasienData;
      } catch (error) {
        this.errorMessage = `Error: ${error.message}`;
      }
    },
    
    async submitForm() {
      const url = `http://localhost:3000/pasien/${this.$route.params.id_pasien}`;
      console.log(this.pasien);
      const data = this.pasien;
      try {
        const response = await fetch(url, {
          method: 'PUT',
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
        this.$router.push({ name: 'pasien' });
      } catch (error) {
        console.log(`Error: ${error.message}`);
        this.errorMessage = `Error: ${error.message}`;
        this.successMessage = '';
      }
    }
  }
}

</script>