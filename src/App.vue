<template>
  <div class="flex flex-center gameboard">
    <div class="flex flex-column flex-center">
      <div class="flex flex-self-center m1">
        <MingCard v-for="(cid, index) in boardcards" v-bind:key="'boardcards'+index" :cid="cid" />
      </div>
      <div class="flex flex-self-center">
        <Card
          v-for="(cid, index) in sortedcards"
          v-bind:key="'myhands'+index"
          :cid="cid"
          @click="out(cid)"
          :class="[(index == sortedcards.length - 1) ? 'drawhand' : '', (hintout.indexOf(cid) != -1) ? 'special' : '']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import MingCard from "./components/MingCard.vue";

export default {
  name: "App",
  data() {
    return {
      boardcards: [],
      cards: [],
      tiles: [],
      hintout: [],
    };
  },
  mounted() {
    for (let i = 0; i < 38; i++) {
      if (i % 10 != 0) {
        this.tiles = this.tiles.concat(Array(4).fill(i));
      }
    }
    this.tiles.sort(() => Math.random() - 0.5);
    this.cards = this.tiles.splice(0, 17);
    this.tick();
  },

  components: {
    Card,
    MingCard,
  },

  methods: {
    out(cid) {
      this.boardcards = this.boardcards.concat(
        this.cards.splice(this.cards.indexOf(cid), 1)
      );
      this.cards = this.cards.concat(this.tiles.splice(0, 1));
      this.tick();
    },
    tick() {
      this.hint();
    },
    hint() {
      let temp = Array(38).fill(0);
      for (let x of this.cards) {
        temp[x]++;
      }
      temp.splice(30, 1);
      temp.splice(20, 1);
      temp.splice(10, 1);
      temp.splice(0, 1);

      fetch("http://localhost:3000/check/" + temp.join(""))
        .then((res) => res.json())
        .then((j) => {
          this.hintout = j.out;
        });
    },
  },

  computed: {
    sortedcards() {
      if (this.cards.length === 0) return [];
      let temp = JSON.parse(JSON.stringify(this.cards));
      let d = temp.pop();
      temp.sort(function (a, b) {
        return Number(a) - Number(b);
      });
      temp.push(d);
      return temp;
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-image: linear-gradient(to right, black, #013220 400px, black 800px); */
  background-color: #013220;
  width: 100%;
  height: 100%;
}

.gameboard {
  width: 100%;
  height: calc(100% - 5rem);
  padding-bottom: 5rem;
}
</style>

<style scoped>
.drawhand {
  margin-left: 1.2rem;
}

.special {
  -webkit-filter: brightness(1.5);
}

.m1 {
  margin: 1rem;
}

.flex {
  display: flex;
}

.flex-row {
  flex-flow: row;
}

.flex-column {
  flex-flow: column;
}

.flex-center {
  justify-content: center;
}

.flex-self-start {
  align-self: flex-start;
}
.flex-self-center {
  align-self: center;
}

.flex-self-end {
  align-self: flex-end;
}
</style>
