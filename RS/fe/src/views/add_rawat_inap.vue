<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="card p-3" style="width: max-content;">
      <label for="spesialisasi">Pilih Spesialisasi:</label>
      <select v-model="selectedSpesialisasi" id="spesialisasi" @change="fetchDoctors">
        <option value="">Pilih Spesialisasi</option>
        <option v-for="spesialisasi in spesialisasiOptions" :key="spesialisasi.spesialisasi" :value="spesialisasi.spesialisasi">
          {{ spesialisasi.spesialisasi }}
        </option>
      </select>

      <label for="doctors">Pilih Dokter:</label>
      <select v-model="selectedDoctor" id="doctors">
        <option value="">Pilih Dokter</option>
        <option v-for="doctor in filteredDoctors" :key="doctor.id_dokter" :value="doctor">
          {{ doctor.nama_dokter }}
        </option>
      </select>

      <div class="input-group my-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nomor Kamar</span>
        <input type="int" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="noKamar">
      </div>

      <button @click="addRawatInap" type="button" class="btn btn-primary mx-1">Tambah</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSpesialisasi: '',
      selectedDoctor: null,
      noKamar: '',
      spesialisasiOptions: [],
      doctorOptions: []
    };
  },
  computed: {
    filteredDoctors() {
      if (!this.selectedSpesialisasi) {
        return [];
      } else {
        return this.doctorOptions.filter(doctor => doctor.spesialisasi === this.selectedSpesialisasi);
      }
    }
  },
  methods: {
    async fetchDoctors() {
      try {
        const spesialisasiResponse = await fetch('http://localhost:3000/dokter/spesialisasi');
        const spesialisasiData = await spesialisasiResponse.json();
        this.spesialisasiOptions = spesialisasiData;

        const doctorsResponse = await fetch('http://localhost:3000/dokter');
        const doctorsData = await doctorsResponse.json();
        this.doctorOptions = doctorsData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addRawatInap() {
      if (!this.selectedDoctor) {
        console.error('Dokter belum dipilih');
        return;
      }
      console.log(this.noKamar)
      try {
        const response = await fetch('http://localhost:3000/rawat_inap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nomor_kamar: this.noKamar,
            pasien_id_pasien: this.$route.params.id_pasien,
            dokter_id_dokter: this.selectedDoctor.id_dokter,
          })
        });

        if (response.ok) {
          console.log('Rawat inap berhasil ditambahkan!');
          this.selectedSpesialisasi = '';
          this.selectedDoctor = null;
          this.noKamar = '';
        } else {
          console.error('Gagal menambahkan rawat inap');
        }
      } catch (error) {
        console.error('Error adding rawat inap:', error);
      }
    }
  },
  created() {
    this.fetchDoctors();
  }
};
</script>
