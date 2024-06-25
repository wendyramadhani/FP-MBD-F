<template>
  <div class="d-flex justify-content-center mt-3">
    <div class="card p-3" style="width: max-content;">
      <label for="spesialisasi">Pilih Spesialisasi:</label>
      <select v-model="selectedSpesialisasi" id="spesialisasi" @change="fetchDoctors">
        <option value="">Pilih Spesialisasi</option>
        <option v-for="spesialisasi in spesialisasiOptions" :key="spesialisasi.id_dokter" :value="spesialisasi.spesialisasi">
          {{ spesialisasi.spesialisasi }}
        </option>
      </select>

      <label for="doctors">Pilih Dokter:</label>
      <select v-model="selectedDoctor" id="doctors">
        <option value="">Pilih Dokter</option>
        <option v-for="doctor in filteredDoctors" :key="doctor.id_dokter" :value="doctor.nama_dokter">
          {{ doctor.nama_dokter }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSpesialisasi: '',
      selectedDoctor: '',
      spesialisasiOptions: [],
      doctorOptions: [],
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
        // Ganti URL berikut dengan URL API yang sesuai untuk mendapatkan data spesialisasi
        const spesialisasiResponse = await fetch('http://localhost:3000/dokter/spesialisasi');
        const spesialisasiData = await spesialisasiResponse.json();
        this.spesialisasiOptions = spesialisasiData;

        // Ganti URL berikut dengan URL API yang sesuai untuk mendapatkan data dokter
        const doctorsResponse = await fetch('http://localhost:3000/dokter');
        const doctorsData = await doctorsResponse.json();
        this.doctorOptions = doctorsData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  created() {
    // Panggil method fetchDoctors pada saat komponen dibuat untuk mengisi data spesialisasi dan dokter dari API
    this.fetchDoctors();
  }
};
</script>
