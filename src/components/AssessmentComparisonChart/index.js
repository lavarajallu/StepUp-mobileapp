import React, { useState, useEffect } from 'react'
import { Text , View ,Dimensions} from 'react-native'
//import ChartView from 'react-native-highcharts';
import ChartView from './HighChart.js';

const windowWidth = Dimensions.get('window').width;

const AssessmentComparisonChart = props => {
  const { topicPreVsPostData } = props
  let [chartOptions, setChartOptions] = useState(null)
  let [chartConfig, setChartConfig] = useState(null)
  let [spinner,setspinner] = useState(true)

  useEffect(() => {
    if (topicPreVsPostData && Object.keys(topicPreVsPostData).length) {
        console.log("   ",topicPreVsPostData?.super?.postTestScore)
    //     const conf = {
    //       chart: {
    //         type: 'bar',
    //         animation: {
    //           duration: 1000,
    //         },
    //         style: {
    //          // fontFamily: 'Roboto, sans-serif',
    //         }
    //     },
    //     title: {
    //         text: 'Pre (vs) Post Assessments'
    //     },
    //     xAxis: {
    //         categories: ['Post Assessment','Pre Assessment']
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Aggregate of all Assessments (%)'
    //         }
    //     },
    //     fill: {
    //       colors: ['#a4b96e','#F94D48'],
    //     },
    //     colors: ['#a4b96e','#F94D48'],
    //     legend: {
    //         reversed: true
    //     },
    //     plotOptions: {
    //       series: {
    //           stacking: 'normal'
    //       }
    //   },
    //     series: [
    //       {
    //         name: 'Post Assessment',
    //         data: [topicPreVsPostData?.super?.postTestScore, 0,]
    //     },
    //     {
    //       name: 'Pre Assessment',
    //       data: [0,topicPreVsPostData?.super?.preTestScore]
    //   }
    //   ]
    //     }
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
                text: 'Pre (vs) Post Assessments'
            },
            xAxis: {
                categories: ['Post Assessment','Pre Assessment']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Aggregate of all Assessments (%)'
                }
            },
            credits: {
              enabled: false
          },
            fill: {
              colors: ['#a4b96e','#F94D48'],
            },
            colors: ['#a4b96e','#F94D48'],
            legend: {
              enabled: false
          },
          exporting: {
              enabled: false
          },
            series: [
                {
                  name: 'Post Assessment',
                  data: [topicPreVsPostData?.super?.postTestScore, 0,]
              },
              {
                name: 'Pre Assessment',
                data: [0,topicPreVsPostData?.super?.preTestScore]
            }
            ]
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
  }, [topicPreVsPostData])

  return (
    spinner ? <Text>Loading....</Text> :
<View style={{alignItems:"center"}}>
<ChartView style={{height:300,width:windowWidth/1.1}} config={chartConfig} options={chartOptions} originWhitelist={['']}></ChartView>
</View>
  )
}

export default AssessmentComparisonChart
