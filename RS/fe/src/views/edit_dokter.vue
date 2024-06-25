<template>
<div class="d-flex justify-content-center m-4">
  <div class="card p-3" style="width: auto;">
    <div>
      <h2>Edit Dokter</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Nama Dokter</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="form.nama_dokter">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Spesialisasi</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="form.spesialisasi">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Jadwal</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="form.jadwal">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Nomer Telepon</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="form.nomor_telepon">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</div>
</template>



<script>
export default {
  props: ['id'],
  data() {
    return {
      form: {
        nama_dokter: '',
        spesialisasi: '',
        jadwal: '',
        nomor_telepon: ''
      },
      error: null
    };
  },
  methods: {
    async submitForm() {
      try {
        const updateData = {};

        if (this.form.nama_dokter) {
          updateData.nama_dokter = this.form.nama_dokter;
        }
        if (this.form.spesialisasi) {
          updateData.spesialisasi = this.form.spesialisasi;
        }
        if (this.form.jadwal) {
          updateData.jadwal = this.form.jadwal;
        }
        if (this.form.nomor_telepon) {
          updateData.nomor_telepon = this.form.nomor_telepon;
        }

        const response = await fetch(`http://localhost:3000/dokter/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        alert('Data berhasil diperbarui');
        this.$router.push('/dokter'); // Redirect ke halaman utama atau halaman yang diinginkan
      } catch (error) {
        this.error = 'Error updating data: ' + error.message;
        console.error('Error updating data:', error);
      }
    }
  }
};
</script>


