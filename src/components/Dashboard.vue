<template>
   <div>
    <header>
        <h1>{{ msg }}</h1>
        <ul>
        <li> <router-link to ="/" exact>Home</router-link></li>
        <li> <router-link to ="/orders" exact>Orders</router-link></li>
        <li> <router-link to="/dashboard" exact> Dashboard </router-link> </li>
      </ul>
      <BarChart> </BarChart>
      <br>
      <CallAPI> </CallAPI>

    </header>

    </div>
  
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

#main{
    content:"";
    display:table;
    clear:both;
}
#chart{
  height:240px;
  width:300px;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  padding-bottom: 60px;
  float:left;
}

</style>

<script>
import { defineComponent } from '@vue/composition-api'
import BarChart from './charts/BarChart.vue'
import CallAPI from './CallAPI.vue'

export default defineComponent({
  components: { BarChart, CallAPI },
    setup() {
        
    },
})
</script>
