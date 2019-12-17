<template>
  <section class="section fade-in">
    <div class="container">
      <h1 class="title has-text-centered">
        Histórico de compras
      </h1>
      <div class="columns is-centered" v-if="!pageLoading">
        <div class="column is-5">
          <table class="table box">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço de Compra</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(compra, key) in compras" :key="key">
                <td>
                  {{ compra.nome }}
                </td>
                <td>
                  {{ compra.quantidade }}
                </td>
                <td>
                  {{ compra.precompra }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-3">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="buyName"
                placeholder="Nome"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="amount"
                placeholder="Quantidade"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="price"
                placeholder="Preço de Compra"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button
                class="button is-success"
                :class="{ 'is-loading': addLoading }"
                @click="addBuy"
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
      compras: [],
      buyName: undefined,
      amount: undefined,
      price: undefined,

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

    addNewProd() {},

    addBuy() {
      console.log("entrou");
      // Check if newprod is valid
      if (
        !this.buyName ||
        (typeof this.buyName === "string" && this.buyName.length === 0)
      )
        return;

      // Set loading state for button
      this.addLoading = true;

      // Create Object
      let obj = {
        nome: this.buyName,
        quantidade: parseInt(this.amount),
        precompra: parseFloat(this.price)
      };
      console.log("a compra gerada foi:");
      console.log(obj);
      let vm = this;
      //Verifying if Produto is already in produtos table:

      let aux = false;
      console.log(aux);
      let prodRef = this.db.collection("produtos");

      let query = prodRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data().nome);
          if (doc.data().nome == obj.nome) {
            console.log("Achou, Já tem! É o produto:");
            console.log(obj.nome);
            aux = true;
            console.log("A quantidade chegando é:");
            console.log(obj.quantidade);

            //updateProd()

            let oldQuantidade = doc.data().quantidade;
            //let oldPrecompra = doc.data().quantidade;
            console.log("A quantidade antiga era:");
            console.log(oldQuantidade);
            console.log("Pronto, a quantidade foi atualizada no estoque!");
            console.log("o id do produto ja existente é:");
            console.log(doc.id);

            this.db
              .collection("produtos")
              .doc(doc.id)
              .set({
                nome: obj.nome,
                quantidade: oldQuantidade + obj.quantidade,
                precompra: obj.precompra
              });
          }
        });

        if (aux == false) {
          //addNewProd()
          console.log("Não tem!");
          console.log("o produto gerado foi:");
          console.log(obj);
          this.db
            .collection("produtos")
            .add(obj)
            .then(function(docRef) {
              console.log("Produto gerado com ID: ", docRef.id);
              vm.produtos.push(obj);
              vm.buyName = undefined;
              vm.amount = undefined;
              vm.addLoading = false;
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
              vm.addLoading = false;
            });
        }
      });
      console.log(query);
      //}
      //fim do pseudocode

      // Add in Firestore
      // Store reference to vue virtual machine, since this is lost inside db.then function
      this.db
        .collection("compras")
        .add(obj)
        .then(function(docRef) {
          console.log("Compra gerada com ID: ", docRef.id);
          vm.compras.push(obj);
          vm.buyName = undefined;
          vm.amount = undefined;
          vm.price = undefined;

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
      .collection("compras")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} =>`, doc.data());
          this.compras.push(doc.data());
          console.log(this.compras);
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
