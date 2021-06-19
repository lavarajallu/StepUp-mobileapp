import React, { useState, useEffect } from 'react'
import { Text , View } from 'react-native'
//import ChartView from 'react-native-highcharts';
import ChartView from './HighChart.js';
const ColumnChart = ({ type, question }) => {
  let [chartOptions, setChartOptions] = useState(null)
  let [chartConfig, setChartConfig] = useState(null)
  let [spinner,setspinner] = useState(true)
  useEffect(() => {
      console.log("datattatatatta",question)
    if (question && Object.keys(question).length) {
      let total = question.correct + question.inCorrect
      var Highcharts='Highcharts';
      const conf = {
        chart: {
          type: 'column',
          animation: Highcharts.svg,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          categories: [type],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          tickInterval: total < 10 ? 1 : 2,
          title: {
            text: '',
          },
        },
        // tooltip: {
        //   headerFormat:
        //     '<span style="font-size:10px">{point.key}</span><table>',
        //   pointFormat:
        //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //     '<td style="padding:0"><b>{point.y}</b></td></tr>',
        //   footerFormat: '</table>',
        //   shared: true,
        //   useHTML: true,
        // },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
          },
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
        series: [
          {
            showInLegend: false,
            name: 'Correct',
            data: [{ y: question.correct, color: '#A3BA6D' }], // this point is red
          },
          {
            showInLegend: false,
            name: 'Incorrect',
            data: [{ y: question.inCorrect, color: '#F94D48' }], // this point is red
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
  }, [question])

  return (
    spinner ? <Text>Loading....</Text> :
    <View>
<ChartView style={{height:300}} config={chartConfig} options={chartOptions} originWhitelist={['']}></ChartView>
<View style={{flexDirection:"row",marginTop:15,justifyContent:"center"}}>
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

export default ColumnChart
