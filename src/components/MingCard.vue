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
      return "/img/majiang/mingmah_" + (this.cid + 10) + ".png";
    },
  },
};
</script>


<style scoped>
.card {
  display: flex;
  width: 1.5rem;
}

.card img {
  max-height: 100%;
  max-width: 100%;
}
</style>