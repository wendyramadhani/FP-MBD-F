<template>
    <div class="d-flex justify-content-center m-4">
      <div class="card p-3" style="width: auto;">
        <div>
          <form @submit.prevent="submitForm">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">Stok</span>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" v-model="form.nama_dokter">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
    </template>
    
    
    
    <script>
    export default {
      props: ['id_obat'],
      data() {
        return {
          form: {
            stok: '',
          },
          error: null
        };
      },
      methods: {
        async submitForm() {
          try {
            const updateData = {};
    
            if (this.form.nama_dokter) {
              updateData.stok = this.form.nama_dokter;
            }
            
    
            const response = await fetch(`http://localhost:3000/obat/stok/${this.id_obat}`, {
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
            console.log(this.id_obat);
          } catch (error) {
            this.error = 'Error updating data: ' + error.message;
            console.error('Error updating data:', error);
          }
        }
      }
    };
    </script>
    
    
    