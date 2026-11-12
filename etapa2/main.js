const { createApp } = Vue;

createApp({
  data() {
    return {
      contador: 0,
      menuAberto: true,
    };
  },
}).mount('#app');