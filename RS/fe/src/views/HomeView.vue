<template>
    <div>
      <p>Original String: {{ originalString }}</p>
      <p>Split Array:</p>
      <ul>
        <li v-for="(item, index) in splitArray" :key="index">{{ item }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        originalString: 'susu sapi,babi,koontol,limpa',
        splitArray: []
      };
    },
    created() {
      this.splitString();
    },
    methods: {
      splitString() {
        this.splitArray = this.originalString.split(',');
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  