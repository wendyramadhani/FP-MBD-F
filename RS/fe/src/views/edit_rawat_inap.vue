<template>
  <div class="d-flex justify-content-center">
    <div class="card mx-auto mt-3 p-3" style="width: auto;">
      <div>
        <label for="drug-select">Pilih Obat:</label>
        <select v-model="selectedDrug" id="drug-select">
          <option value="" disabled>Pilih...</option>
          <option v-for="drug in drugs" :key="drug.id_obat" :value="drug.id_obat">{{ drug.nama_obat }} ({{ drug.stok }})</option>
        </select>
      </div>
      <div class="mx-auto">
        <label for="drug-quantity">Jumlah:</label>
        <input v-model.number="selectedQuantity" type="number" min="1" placeholder="Jumlah" id="drug-quantity"/>
        <ul>
          <li v-for="(entry, index) in selectedDrugs" :key="index">
            {{ entry.name }} - Jumlah: {{ entry.quantity }}
            <button @click="removeDrug(index)" class="m-2">Hapus</button>
          </li>
        </ul>
      </div>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1" for="nama_dokter">Diagnosis</span>
        <input type="text" class="form-control m-auto" v-model="diagnosis">
      </div>
      <div class="mt-3">
        <button @click="handleTambahkan">Tambahkan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDrug: '',
      selectedQuantity: 1,
      drugs: [],
      selectedDrugs: [],
      diagnosis: '',
      existingEntry: null
    };
  },
  mounted() {
    this.fetchDrugs(); // Panggil method untuk mengambil data obat-obatan saat komponen dimuat
  },
  methods: {
    async fetchDrugs() {
      try {
        // Ganti URL berikut dengan URL API yang sesuai
        const apiUrl = 'http://localhost:3000/obat';

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Data dari API disimpan ke dalam state 'drugs'
        this.drugs = data;
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data obat:', error);
      }
    },
    async addDrug() {
      if (this.selectedDrug && this.selectedQuantity > 0) {
        const selectedDrug = this.drugs.find(drug => drug.id_obat === this.selectedDrug);
        if (selectedDrug) {
          this.existingEntry = this.selectedDrugs.find(entry => entry.id === selectedDrug.id_obat);
          if (this.existingEntry) {
            this.existingEntry.quantity += this.selectedQuantity;
          } else {
            this.existingEntry = {
              id: selectedDrug.id_obat,
              name: selectedDrug.nama_obat,
              quantity: this.selectedQuantity
            };
            this.selectedDrugs.push(this.existingEntry);
          }
          await this.addobatresep(selectedDrug.id_obat, this.existingEntry.quantity); // Memanggil addobatresep dengan id_obat dan kuantitas
          this.selectedDrug = ''; // Reset dropdown after selection
          this.selectedQuantity = 1; // Reset quantity input after selection
        }
      }
    },
    async addobatresep(id_obat, banyak) {
      const resep_id = localStorage.getItem('id_resep');
      const url = 'http://localhost:3000/resep_obat';
      const data = {
        obat_id_obat: id_obat,
        resep_id_resep: resep_id,
        kuantitas: banyak
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
        console.log('Data telah dimasukkan:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async updateRawatInap() {
      // console.log(localStorage.getItem('obj_ri'))
      const rawatInapId = localStorage.getItem('id_ri');
      const url = `http://localhost:3000/rawat_inap/${rawatInapId}`;
      const data = {
        diagnosis: this.diagnosis
      };

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
        console.log('Rawat inap updated:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async handleTambahkan() {
      await this.addDrug();
      await this.updateRawatInap();
    },
    removeDrug(index) {
      this.selectedDrugs.splice(index, 1);
    }
  }
};
</script>

<style scoped>
label {
  margin-right: 10px;
}

select, input, button {
  margin-bottom: 20px;
  margin-right: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background: rgb(60, 94, 233);
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background: rgb(45, 77, 202);
}
</style>
