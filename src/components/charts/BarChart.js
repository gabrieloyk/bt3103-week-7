import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [], //["Cereal Prawn", "Dry Beef Hor Fun", "Mapo Tofu", "Pork Fried Rice", "Prawn Omelette", "Sambal Kangkung"],
            datasets: [{
                label: "Quantity",
                backgroundColor: ['red','green','blue','purple','orange','pink'],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        var totalItems = {}
        database.collection('orders').get().then(
            snap => {
                snap.forEach( doc => {
                    var order = doc.data()
                    for (var dish in order) {
                        if (totalItems[dish]) {
                            totalItems[dish] += order[dish]
                        } else {
                            totalItems[dish] = order[dish]
                        }
                    }
                })
            for (var dish of Object.keys(totalItems).sort()) {
                this.datacollection.labels.push(dish)
                this.datacollection.datasets[0].data.push(totalItems[dish])
            }
            console.log(totalItems)
            this.renderChart(this.datacollection, this.options)
        }) 
    } 
  },
  created () {
    this.fetchItems()
  }
}
