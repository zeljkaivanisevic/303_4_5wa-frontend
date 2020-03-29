<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import {Posts} from "@/services"
export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  created() {
    this.fetchPosts(),
    this.zad304(this.funkcija_rezultat),
    this.zad305(this.funkcija_rezultat)
  },
  name: "posts",
  methods: {

funkcija_rezultat (rezultat){
console.log(rezultat)
},

//zadatak 304
zad304(callBack304){
  let a= fetch('https://api.exchangeratesapi.io/latest?symbols=HRK').then(response => {return response.json()}).then(q => {return callBack304(q.rates.HRK)})
  return a
},

//zadatak 305
async zad305(callBack305){   
 let response = await fetch('https://api.exchangeratesapi.io/latest?symbols=HRK')  
 let rez =response.json().then(w =>{return callBack305(w.rates.HRK)})
 return rez 
  },



 async fetchPosts(term) {
      term = term || store.searchTerm
    
Posts.getAll(term) // zamjena za "fetch"
this.cards = await Posts.getAll(term)

    },

    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>