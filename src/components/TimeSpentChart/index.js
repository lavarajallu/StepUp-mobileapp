import React, { useState, useEffect } from 'react'
import { Text , View } from 'react-native'
//import ChartView from 'react-native-highcharts';
import ChartView from './HighChart.js';

const TimeSpentChart = props => {
  const { testResult } = props
  let [chartOptions, setChartOptions] = useState(null)
  let [chartConfig, setChartConfig] = useState(null)
  let [spinner,setspinner] = useState(true)

  useEffect(() => {
    if (testResult && Object.keys(testResult).length) {
      if (testResult.questions && testResult.questions.length) {
        let labels = []
        let idealTimeData = []
        let spentTimeData = []
        let spentTimeColors = []
        testResult.questions.forEach((tq, i) => {
          labels.push(i + 1)
          idealTimeData.push(tq.assigned_time)
          spentTimeData.push(tq.test_taken_time)
          let color = tq.is_correct ? '#a3ba6d' : '#f94d48'
          spentTimeColors.push(color)
        })
        console.log('spentTimeColors.....', spentTimeColors)
        const conf = {
          chart: {
            type: 'bar',
            animation: {
              duration: 1000,
            },
            style: {
              fontFamily: 'Roboto, sans-serif',
            },
          },
          title: {
            text: 'Time Spent ',
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            categories: labels,
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
          fill: {
            colors: ['#a14321', '#307698'],
          },
          yAxis: {
            title: {
              text: 'Seconds',
            },
            labels: {
              formatter: function () {
                return `${this.value}s`
              },
            },
          },
          series: [
            {
              name: 'Time Spent',
              data: spentTimeData,
              colorByPoint: true,
              colors: spentTimeColors,
            },
            { name: 'Ideal Optimized Time', data: idealTimeData },
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
    }
  }, [testResult])

  return (
    spinner ? <Text>Loading....</Text> :
    <View>
<ChartView style={{height:800,overflow:"hidden"}} config={chartConfig} options={chartOptions} originWhitelist={['']}></ChartView>
<View style={{flexDirection:"row",marginTop:15,justifyContent:"center"}}>
<View style={{flexDirection:"row",marignLeft:10,justifyContent:"center",alignItems:"center",marginRight:10}}>
        <View style={{width:10,height:10,backgroundColor:"#7CB5EC"}}/>
        <Text style={{marginLeft:5}}>IdealTime</Text>
    </View>
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
        <View style={{width:10,height:10,backgroundColor:"#A3BA6D",alignItems:"center"}}/>
        <Text style={{marginLeft:5}}>Correct</Text>
    </View>
    <View style={{flexDirection:"row",marignLeft:10,justifyContent:"center",alignItems:"center"}}>
        <View style={{width:10,height:10,backgroundColor:"#F94D48"}}/>
        <Text style={{marginLeft:5}}>Incorrect</Text>
    </View>
</View>
    </View>
  )
}

export default TimeSpentChart
