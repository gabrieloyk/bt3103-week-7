<template>
    <div>
        
        
        <div v-for="(count, name, index) in datapacket" v-bind:key="name">
            <p id="dish">{{name}}: {{count}}</p>
            <br>
            <input :id="index" placeholder=0 type="number" min="0"/>
        </div>
        <br>
        <button id="add-btn" v-on:click="updateOrder"> Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js';

export default {
    props: {
        doc_id:String
    },
    data() {
        return {
            datapacket:{}
        }
    },
    methods: {
        fetchItems:function() {
            database.collection("orders").doc(this.doc_id).get().then(doc => {
                this.datapacket = doc.data();
            })
        },
        updateOrder:function() {
            var copy = Object.assign({},this.datapacket)
            Object.entries(this.datapacket).forEach(([key], index) => {
                var count = document.getElementById(index).value;
                if (count != "" || count != 0) {
                copy[key] = parseInt(count);
                }
            });
            database.collection("orders").doc(this.doc_id).update(copy).then(() => {
                this.$router.push("orders");
            });
        }
    },
    created() {
        this.fetchItems();
    }
    
}
</script>

<style scoped>
dish {
    margin-bottom:10px;
}

input {
    font-size:20px;
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>