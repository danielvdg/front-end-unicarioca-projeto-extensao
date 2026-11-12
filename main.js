const { createApp } = Vue;

createApp({
  data() {
    return {
      contador: 0,
      menuAberto: false,
      produtos: [
        {
          id: 1,
          nome: "Caderno Criativo",
          descricao: "Capa dura e 96 folhas para planejar suas ideias.",
          preco: 24.90,
          imagem: "img/caderno.jpg",
          alt: "Fotografia de um caderno"
        },
        {
          id: 2,
          nome: "Estojo Compacto",
          descricao: "Espaço prático para lápis, canetas e acessórios.",
          preco: 18.50,
          imagem: "img/estojo.jpg",
          alt: "Fotografia de um estojo"
        },
        {
          id: 3,
          nome: "Kit Marca-texto",
          descricao: "Cores vibrantes para destacar o que importa.",
          preco: 12.90,
          imagem: "img/marca-texto.jpg",
          alt: "Fotografia de marca-textos coloridos"
        }
      ],
      carrinho: []
    };
  },
  computed: {
    totalCarrinho() {
      return this.carrinho.reduce((total, produto) => total + produto.preco, 0);
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menuAberto) {
        this.menuAberto = false;
        this.$refs.btnMenu?.focus();
      }
    });
  },
  methods: {
    formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    adicionarCarrinho(produto) {
      this.carrinho.push(produto);
    },
    removerCarrinho(indice) {
      this.carrinho.splice(indice, 1);
    },
  },
}).mount('#app');
