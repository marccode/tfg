var myChart_traces = echarts.init(document.getElementById('historical-traces')); 

var data_file = "http://127.0.0.1:5000/getHistoricalFlowsData";
var http_request = new XMLHttpRequest();
try {
   // Opera 8.0+, Firefox, Chrome, Safari
   http_request = new XMLHttpRequest();
}catch(e) {
   // Internet Explorer Browsers
   try {
      http_request = new ActiveXObject("Msxml2.XMLHTTP");
        
   } catch(e) {
    
      try {
         http_request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
         // Something went wrong
         alert("Your browser broke!");
      }
        
   }
}

http_request.onreadystatechange = function() {

    if (http_request.readyState == 4  ) {
        
        var legendData = [];
        var seriesData = [];

        var resp_text = http_request.responseText;

        var jsonObj = JSON.parse(resp_text);

        for (var key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                if (jsonObj[key] > 0 ) {
                    legendData.push(key);
                    seriesData.push({
                        name: key,
                        value: jsonObj[key]
                    });
                }
            }
        }

        var option = {
            backgroundColor: '#2c343c',

            title : {
                text: 'Historical Flows',
                subtext: 'Graph of all the classified flows',
                x:'center',
                textStyle: {
                    color: '#becfda'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} flows ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 'middle',
                bottom: 20,
                x:"left",
                y:"center",
                data: legendData,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                pageTextStyle: {
                    color: '#becfda'
                },
                pageIconColor: "#aaa",
                pageIconInactiveColor: "#4c5967"
            },
            series : [
                {
                    name: 'data-traces',
                    type: 'pie',
                    radius : '75%',
                    center: ['60%', '60%'],
                    data: seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        },
                        emphasis: {
                            lineStyle: {
                                color: '#aaa'
                            }
                        }
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#aaa'
                            }
                        }
                    }            
                }
            ]
        };      

        myChart_traces.setOption(option);
    }
};

http_request.open("GET", data_file, true);
http_request.send();