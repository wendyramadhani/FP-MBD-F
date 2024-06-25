<template>
  <div class="btn-group">
    <label for="route-dropdown">Pilih Halaman:</label>
    <select id="route-dropdown" v-model="selectedRoute" @change="navigate">
      <option value="">Pilih</option>
      <option v-for="route in routes" :key="route.path" :value="route.path">
        {{ route.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRoute: '', // Nilai rute yang dipilih
      routes: [ // Daftar rute yang akan ditampilkan dalam dropdown
        { name: 'rawat inap', path: '/rawat_inap' },
        { name: 'rawat jalan', path: '/rawat_jalan' },
      ]
    };
  },
  methods: {
    navigate() {
      if (this.selectedRoute) {
        this.$router.push(this.selectedRoute);
      }
    }
  }
};
</script>

<style scoped>
label {
  margin-right: 10px;
}
select {
  padding: 5px;
  font-size: 16px;
}
</style>
