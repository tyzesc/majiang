<template>
  <div class="card">
    <img alt="card" v-bind:src="getPic()" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cid: Number,
  },
  methods: {
    getPic() {
      return "/img/majiang/handmah_" + (this.cid+10) + ".png";
    },
  }
};
</script>


<style scoped>
.card {
  display: flex;
  width: 3rem;
}

.card:hover {
  transform: translateY(-1rem);
}

.card img {
  max-height: 100%;
  max-width: 100%;
}
</style>