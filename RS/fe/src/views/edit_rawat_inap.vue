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
import Add_rawat_inap from './add_rawat_inap.vue';

export default {
  data() {
    return {
      selectedSpesialisasi: '',
      selectedDoctor: '',
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
        // Mendapatkan data spesialisasi dari API
        const spesialisasiResponse = await fetch('http://localhost:3000/dokter/spesialisasi');
        const spesialisasiData = await spesialisasiResponse.json();
        this.spesialisasiOptions = spesialisasiData;

        // Mendapatkan data dokter dari API
        const doctorsResponse = await fetch('http://localhost:3000/dokter');
        const doctorsData = await doctorsResponse.json();
        this.doctorOptions = doctorsData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async Add_rawat_inap() {
      try {
        // Mengirim permintaan POST untuk menambahkan dokter baru
        const response = await fetch('http://localhost:3000/rawat_inap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nama_dokter: this.newDoctorName,
            spesialisasi: this.newDoctorSpecialization
          })
        });

        // Menangani respons dari server
        if (response.ok) {
          console.log('Dokter berhasil ditambahkan!');
          // Memuat ulang data dokter setelah berhasil menambahkan
          this.fetchDoctors();
          // Kosongkan input setelah berhasil menambahkan
          this.newDoctorName = '';
          this.newDoctorSpecialization = '';
        } else {
          console.error('Gagal menambahkan dokter');
        }
      } catch (error) {
        console.error('Error adding doctor:', error);
      }
    }
  },
  created() {
    // Panggil method fetchDoctors saat komponen dibuat untuk mengisi data spesialisasi dan dokter dari API
    this.fetchDoctors();
  }
};
</script>

  