import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label:'west',
                data: [],
                fill: false,
                borderColor: 'red'
            },{ 
                label:'national',
                data: [],
                fill: false,
                borderColor: 'green'
            },{ 
                label:'east',
                data: [],
                fill: false,
                borderColor: 'blue'
            },{ 
                label:'central',
                data: [],
                fill: false,
                borderColor: 'purple'
            },{ 
                label:'south',
                data: [],
                fill: false,
                borderColor: 'orange'
            },{ 
                label:'north',
                data: [],
                fill: false,
                borderColor: 'pink'
            },]
        },
        options: {
            labels: ['west', 'national', 'east', 'central', 'south', 'north'],   
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI 24 Hourly (By Region)',
              data: [],
              backgroundColor: ['red','green','blue','purple','orange','pink']
            },
            
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            console.log(response.data.items)
            response.data.region_metadata.forEach(d => { 
                this.options.title.data.push(d.name)
                //this.datacollection.labels.push(data.name)
                //this.datacollection.datasets[0].data.push(data[1])
            })
            // var regions = response.data.items.readings.psi_twenty_four_hourly
            // response.data.items.forEach(data => { 
            //     this.datacollection.labels.push(data.timestamp)
            //     for (var line in regions) {
            //         console.log(line)
            //         this.datacollection.datasets[0].data.push(line)
            //     }
            // })
            this.datacollection.datasets[0].color = []
            response.data.items.forEach(data => {
                this.datacollection.labels.push(data.timestamp)
                this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
                this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
                this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
                this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
                this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
                this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
            }
            
            )
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}