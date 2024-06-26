<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row mt-5">

      <!-- Jumlah Pasien Terdaftar -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-start border-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Pasien Terdaftar
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardData.total_pasien }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Jumlah Dokter Terdaftar -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-start border-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Dokter Terdaftar
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardData.total_dokter }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Jumlah Pasien Rawat Inap -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-start border-danger shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Pasien Rawat Inap Terdaftar
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardData.total_pasien_inap }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Jumlah Pasien Rawat Jalan -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-start border-warning shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Pasien Rawat Jalan Terdaftar
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboardData.total_pasien_jalan }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      dashboardData: {}
    };
  },
  created() {
    this.fetchDashboard();
  },
  methods: {
    async fetchDashboard() {
      try {
        const response = await fetch('http://localhost:3000/utils/dashboard');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.dashboardData = data;
      } catch (error) {
        this.error = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>
  
<style scoped>
</style>
  