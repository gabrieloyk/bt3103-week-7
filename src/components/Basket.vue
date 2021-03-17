//{}
<template>
  <div>
    <h1>Menu:</h1>
    <ul>
      <li v-for="item in itemsSelected" :key="item.name">
        <p>{{ item[0] }} x {{ item[1] }}</p>
      </li>
    </ul>
    <button v-on:click= "findTotal(), sendOrder()"> Calculate Total</button>
    <p v-show="show">Sub Total: ${{ subTotal }}</p>
    <p v-show="show">Grand Total: ${{ grandTotal }}</p>
  </div>
</template>

<script>
import database from "../firebase.js"

export default {
  name: "basket",
  data() {
    return {
      subTotal: 0,
      show: false,
    };
  },
  computed: {
    grandTotal: function () {
      return (this.subTotal * 1.07).toFixed(2);
    },
  },
  methods: {
    findTotal: function () {
      for (let i = 0; i < this.itemsSelected.length; i++) {
        this.subTotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];
      }
      this.subTotal = this.subTotal.toFixed(2);
      this.show = true;
    },
    sendOrder: function() { 
      var order = {
        prawn_omelette: 0,
        dry_beef_hor_fun: 0,
        sambal_kangkung: 0,
        pork_fried_rice: 0,
        mapo_tofu: 0,
        cereal_prawn: 0
      }

      for (let i = 0; i < this.itemsSelected.length; i++) {
        switch (this.itemsSelected[i][0]) {
          case "Prawn omelette":
            order.prawn_omelette = this.itemsSelected[i][1];
            break;
          case "Dry Beef Hor Fun":
            order.dry_beef_hor_fun = this.itemsSelected[i][1];
            break;
          case "Sambal KangKung":
            order.sambal_kangkung = this.itemsSelected[i][1];
            break;
          case "Pork Fried Rice":
            order.pork_fried_rice = this.itemsSelected[i][1];
            break;
          case "Mapo Tofu":
            order.mapo_tofu = this.itemsSelected[i][1];
            break;
          case "Cereal Prawn":
            order.cereal_prawn = this.itemsSelected[i][1];
            break;
        }
      }
    database.collection('orders').add(order).then(() => {
    location.reload();
        });
      }
    
  },
  props: {
    itemsSelected: {
      type: Array,
    },
  },
};
</script>

<style scoped>
p {
  font-size: 24px;
}

button {
  font-family: Arial;
  text-align: center;
  color: black;
  background-color: yellow;
  display: inline;
  font-size: 20px;
  padding: 16px;
  border-radius: 100px;
}
</style>