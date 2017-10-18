var myChart_bytes = echarts.init(document.getElementById('historical-bytes')); 

var data_file__bytes = "http://127.0.0.1:5000/getHistoricalBytesData";
var http_request__bytes = new XMLHttpRequest();
try {
   // Opera 8.0+, Firefox, Chrome, Safari
   http_request__bytes = new XMLHttpRequest();
}catch(e) {
   // Internet Explorer Browsers
   try {
      http_request__bytes = new ActiveXObject("Msxml2.XMLHTTP");
        
   } catch(e) {
    
      try {
         http_request__bytes = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
         // Something went wrong
         alert("Your browser broke!");
      }
        
   }
}

http_request__bytes.onreadystatechange = function() {

    if (http_request__bytes.readyState == 4  ) {
        
        var legendData__bytes = [];
        var seriesData__bytes = [];

        var resp_text_bytes = http_request__bytes.responseText;

        jsonObj_bytes = JSON.parse(resp_text_bytes);

        for (var key_bytes in jsonObj_bytes) {
            if (jsonObj_bytes.hasOwnProperty(key_bytes)) {
                if (jsonObj_bytes[key_bytes] > 0 ) {
                    legendData__bytes.push(key_bytes);
                    seriesData__bytes.push({
                        name: key_bytes,
                        value: jsonObj_bytes[key_bytes]
                    });
                }
            }
        }

        var option_bytes = {
            backgroundColor: '#2c343c',

            title : {
                text: 'Historical Bytes',
                subtext: 'Graph of all the classified bytes',
                x:'center',
                textStyle: {
                    color: '#becfda'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} bytes ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 'middle',
                bottom: 20,
                x:"left",
                y:"center",
                data: legendData__bytes,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                pageIconColor: "#aaa",
                pageIconInactiveColor: "#4c5967",
                pageTextStyle: {
                    color: '#becfda'
                }
            },
            series : [
                {
                    name: 'data-traces',
                    type: 'pie',
                    radius : '75%',
                    center: ['60%', '60%'],
                    data: seriesData__bytes,
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

        myChart_bytes.setOption(option_bytes);
    }
};

http_request__bytes.open("GET", data_file__bytes, true);
http_request__bytes.send();