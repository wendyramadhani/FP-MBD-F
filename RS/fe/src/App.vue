<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="coba" >
      <div class="d-flex justify-content-end">
          <RouterLink to="/dokter" class="tulisan btn text-white">dokter</RouterLink>
          <RouterLink to="/pasien" class="tulisan btn text-white">pasien</RouterLink>
          <RouterLink to="/rawat_inap" class="tulisan btn text-white">Rawat Inap</RouterLink>
          <RouterLink to="/rawat_jalan" class="tulisan btn text-white">Rawat jalan</RouterLink>
          <RouterLink to="/pembayaran" class="tulisan btn text-white">Pembayaran</RouterLink>
          <RouterLink to="/obat" class="tulisan btn text-white">Obat</RouterLink>
      </div>
      <div class="d-flex justify-content-start">
          <RouterLink to="/" class="gambar btn"><img src="./assets/customicon.jpg" style="width: 50px; height: auto;"></RouterLink>
          <RouterLink to="/" class="gambar btn text-white ">Rumah Sakit Mencari Cinta Sejati</RouterLink>
          
      </div>
  </div>
  </header>

  <RouterView />
</template>

<style>
.coba{
  font-size: large;
  margin-top: 0px;
  padding: 25px;
  margin-bottom: 0px;
  background-color: rgb(45, 77, 202);
}
.gambar{
  margin-top: -50px;
  align-self: center;
}
.tulisan{
  margin-top: 10px;
  margin-left: 10px;

}
body{
  background-color:rgb(134, 210, 245);
}
</style>