<template>
  <section class="section fade-in">
    <div class="container">
      <h1 class="title has-text-centered">
        Produtos disponíveis
      </h1>
      <div class="columns is-centered" v-if="!pageLoading">
        <div class="column is-5">
          <table class="table box">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço Médio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produto, key) in produtos" :key="key">
                <td>
                  {{ produto.nome }}
                </td>
                <td>
                  {{ produto.quantidade }}
                </td>
                <td>
                  {{ produto.precompra }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-2">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="newProd"
                placeholder="Novo Produto"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button is-success"
                :class="{ 'is-loading': addLoading }"
                @click="addNew"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="has-text-centered" v-if="pageLoading">
        <faIcon icon="circle-notch" class="fa-spin fa-3x" />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import firebase from "firebase";
require("firebase/firestore");

export default {
  data() {
    return {
      db: undefined,
      produtos: [],
      newProd: undefined,
      addLoading: false,
      pageLoading: true
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },

    addNew() {
      // Check if newprod is valid
      if (
        !this.newProd ||
        (typeof this.newProd === "string" && this.newProd.length === 0)
      )
        return;

      // Set loading state for button
      this.addLoading = true;

      // Create Object
      let obj = {
        nome: this.newProd,
        quantidade: 0,
        precompra: 0
      };

      // Add in Firestore
      let vm = this; // Store reference to vue virtual machine, since this is lost inside db.then function
      this.db
        .collection("produtos")
        .add(obj)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          vm.produtos.push(obj);
          vm.newProd = undefined;
          vm.addLoading = false;
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          vm.addLoading = false;
        });
    }
  },
  mounted() {
    this.db = firebase.firestore();
    this.db
      .collection("produtos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} =>`, doc.data());
          this.produtos.push(doc.data());
          console.log(this.produtos);
        });
      })
      .finally(() => {
        this.pageLoading = false;
      });
  }
};
</script>
<style lang="scss">
@import "bulma";

.table {
  margin: 0 auto;
}
</style>
