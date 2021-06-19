import React, { useState, useEffect } from 'react'
import { Text , View } from 'react-native'
//import ChartView from 'react-native-highcharts';
import ChartView from './HighChart.js';

const LineChart = ({ studentPreVsPost }) => {

   let [chartOptions, setChartOptions] = useState(null)
  let [chartConfig, setChartConfig] = useState(null)
  let [spinner,setspinner] = useState(true)



  useEffect(() => {
    console.log('preTestData', studentPreVsPost)
    if (studentPreVsPost && studentPreVsPost.length) {
      let labels = studentPreVsPost.map(pt => pt.name)
      let preTestData = studentPreVsPost.map(pt => {
        return pt.superPreTestScore
      })
      let postTestData = studentPreVsPost.map(pt => {
        return pt.superPostTestScore
      })
      const conf = {
        chart: {
          type: 'spline',
          animation: {
            duration: 1000,
          },
          style: {
            fontFamily: 'Roboto, sans-serif',
          },
        },

        title: {
          text: '',
        },
        credits: {
          enabled: false
      },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        xAxis: {
          categories: labels,
        },
        fill: {
          colors: ['#dfb027'],
        },
        colors: ['#F94D48','#a4b96e'],
        yAxis: {
          title: '',
          min: 0,
          // max: 100,
          // tickInterval: 20,
          // labels: {
          //   formatter: function () {
          //     return `${this.value}%`
          //   },
          // },
        },
        series: [
          {
            name: 'Pre Test',
            data: preTestData,
          },
          {
            name: 'Post Data',
            data: postTestData,
          },
        ],
      }
      const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };
      setChartOptions(options);
      setChartConfig(conf);
      setspinner(false)
    }
    console.log('preTestData', studentPreVsPost)
  }, [studentPreVsPost])

  return (

        spinner ? <Text>Loading....</Text> :
    <View>
<ChartView style={{height:400}} config={chartConfig} options={chartOptions} originWhitelist={['']}></ChartView>
<View style={{flexDirection:"row",marginTop:15,justifyContent:"center"}}>
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
        <View style={{width:10,height:10,backgroundColor:"#A3BA6D",alignItems:"center"}}/>
        <Text style={{marginLeft:5}}>Post Test</Text>
    </View>
    <View style={{flexDirection:"row",marignLeft:10,justifyContent:"center",alignItems:"center"}}>
        <View style={{width:10,height:10,backgroundColor:"#F94D48"}}/>
        <Text style={{marginLeft:5}}>Pre Test</Text>
    </View>
</View>
    </View>
  )
}

export default LineChart
