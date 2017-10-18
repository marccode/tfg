var myChart = echarts.init(document.getElementById('real-time-traces'));

var times = [];

var aim_data = [];
var ares_data = [];
var armagetron_data = [];
var battlefield2_data = [];
var battlefield2142_data = [];
var bittorrent_data = [];
var counterstrike_source_data = [];
var dhcp_data = [];
var dns_data = [];
var edonkey_data = [];
var freenet_data = [];
var ftp_data = [];
var gnutella_data = [];
var h323_data = [];
var http_data = [];
var httpaudio_data = [];
var httpcachehit_data = [];
var httpcachemiss_data = [];
var http_itunes_data = [];
var httpvideo_data = [];
var ident_data = [];
var imap_data = [];
var irc_data = [];
var jabber_data = [];
var kugoo_data = [];
var lpd_data = [];
var mohaa_data = [];
var msnmessenger_data = [];
var nbns_data = [];
var nntp_data = [];
var ntp_data = [];
var pop3_data = [];
var pressplay_data = [];
var qq_data = [];
var quake_halflife_data = [];
var radmin_data = [];
var rlogin_data = [];
var rtp_data = [];
var rtsp_data = [];
var shoutcast_data = [];
var sip_data = [];
var skypeout_data = [];
var skypetoskype_data = [];
var smb_data = [];
var smtp_data = [];
var socks_data = [];
var soulseek_data = [];
var ssh_data = [];
var ssl_data = [];
var stun_data = [];
var subversion_data = [];
var teamfortress2_data = [];
var telnet_data = [];
var validcertssl_data = [];
var ventrilo_data = [];
var vnc_data = [];
var whois_data = [];
var worldofwarcraft_data = [];
var x11_data = [];
var xboxlive_data = [];
var yahoo_data = [];

var legendData = ['aim', 'ares', 'armagetron', 'battlefield2', 'battlefield2142', 'bittorrent', 'counterstrike-source', 'dhcp', 'dns', 'edonkey', 'freenet', 'ftp', 'gnutella', 'h323', 'http', 'httpaudio', 'httpcachehit', 'httpcachemiss', 'http-itunes', 'httpvideo', 'ident', 'imap', 'irc', 'jabber', 'kugoo', 'lpd', 'mohaa', 'msnmessenger', 'nbns', 'nntp', 'ntp', 'pop3', 'pressplay', 'qq', 'quake-halflife', 'radmin', 'rlogin', 'rtp', 'rtsp', 'shoutcast', 'sip', 'skypeout', 'skypetoskype', 'smb', 'smtp', 'socks', 'soulseek', 'ssh', 'ssl', 'stun', 'subversion', 'teamfortress2', 'telnet', 'validcertssl', 'ventrilo', 'vnc', 'whois', 'worldofwarcraft', 'x11', 'xboxlive', 'yahoo'];

var option = {
    backgroundColor: '#2c343c',
    title : {
        text: 'Real Time Flows',
        subtext: 'Realtime graph of all the classified flows',
        x:'center',
        textStyle: {
            color: '#becfda'
        }
    },
    tooltip : {
        show: true,
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
            var tooltip_msg = "<b>" + params[0].name + "</b>";
            for (var i = params.length - 1; i >= 0; i--) {
                if (params[i].value > 0) {
                    tooltip_msg = tooltip_msg + "<br>" + params[i].marker + " " + params[i].seriesName + ": " + params[i].value;
                }
            };
            return tooltip_msg;
        }
    },
    legend: {
        orient: 'vertical',
        type: 'scroll',
        right: 20,
        top: 'middle',
        bottom: 20,
        textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
        },
        pageIconColor: "#aaa",
        pageIconInactiveColor: "#4c5967",
        pageTextStyle: {
                color: '#becfda'
        },
        x:'right',
        y:'center',
        data: legendData
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom : {
        show : false,
        start : 0,
        end : 100
    },
    xAxis : [
        {
            type : 'category',
            name : 'Time',
            nameLocation: 'middle',
            nameTextStyle: {
                color: '#becfda'
            },
            data: times,
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#becfda",
                    width: 5
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
                lineStyle: {
                    color: '#becfda',
                    type: 'line'
                }
            },
            nameGap: 35
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale: false,
            name : 'Number of flows',
            nameLocation: 'middle',
            boundaryGap: [0.2, 0.2],
            nameTextStyle: {
                color: '#becfda'
            },
            splitLine: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: "#becfda",
                    width: 5
                }
            },
            min: 0,
            nameGap: 40
        }
    ],
    series : [
        {
            name:'aim',
            type:'line',
            data: aim_data
        },
        {
            name:'ares',
            type:'line',
            data: ares_data
        },
        {
            name:'armagetron',
            type:'line',
            data: armagetron_data
        },
        {
            name:'battlefield2',
            type:'line',
            data: battlefield2_data
        },
        {
            name:'battlefield2142',
            type:'line',
            data: battlefield2142_data
        },
        {
            name:'bittorrent',
            type:'line',
            data: bittorrent_data
        },
        {
            name:'counterstrike-source',
            type:'line',
            data: counterstrike_source_data
        },
        {
            name:'dhcp',
            type:'line',
            data: dhcp_data
        },
        {
            name:'dns',
            type:'line',
            data: dns_data
        },
        {
            name:'edonkey',
            type:'line',
            data: edonkey_data
        },
        {
            name:'freenet',
            type:'line',
            data: freenet_data
        },
        {
            name:'ftp',
            type:'line',
            data: ftp_data
        },
        {
            name:'gnutella',
            type:'line',
            data: gnutella_data
        },
        {
            name:'h323',
            type:'line',
            data: h323_data
        },
        {
            name:'http',
            type:'line',
            data: http_data
        },
        {
            name:'httpaudio',
            type:'line',
            data: httpaudio_data
        },
        {
            name:'httpcachehit',
            type:'line',
            data: httpcachehit_data
        },
        {
            name:'httpcachemiss',
            type:'line',
            data: httpcachemiss_data
        },
        {
            name:'http-itunes',
            type:'line',
            data: http_itunes_data
        },
        {
            name:'httpvideo',
            type:'line',
            data: httpvideo_data
        },
        {
            name:'ident',
            type:'line',
            data: ident_data
        },
        {
            name:'imap',
            type:'line',
            data: imap_data
        },
        {
            name:'irc',
            type:'line',
            data: irc_data
        },
        {
            name:'jabber',
            type:'line',
            data: jabber_data
        },
        {
            name:'kugoo',
            type:'line',
            data: kugoo_data
        },
        {
            name:'lpd',
            type:'line',
            data: lpd_data
        },
        {
            name:'mohaa',
            type:'line',
            data: mohaa_data
        },
        {
            name:'msnmessenger',
            type:'line',
            data: msnmessenger_data
        },
        {
            name:'nbns',
            type:'line',
            data: nbns_data
        },
        {
            name:'nntp',
            type:'line',
            data: nntp_data
        },
        {
            name:'ntp',
            type:'line',
            data: ntp_data
        },
        {
            name:'pop3',
            type:'line',
            data: pop3_data
        },
        {
            name:'pressplay',
            type:'line',
            data: pressplay_data
        },
        {
            name:'qq',
            type:'line',
            data: qq_data
        },
        {
            name:'quake-halflife',
            type:'line',
            data: quake_halflife_data
        },
        {
            name:'radmin',
            type:'line',
            data: radmin_data
        },
        {
            name:'rlogin',
            type:'line',
            data: rlogin_data
        },
        {
            name:'rtp',
            type:'line',
            data: rtp_data
        },
        {
            name:'rtsp',
            type:'line',
            data: rtsp_data
        },
        {
            name:'shoutcast',
            type:'line',
            data: shoutcast_data
        },
        {
            name:'sip',
            type:'line',
            data: sip_data
        },
        {
            name:'skypeout',
            type:'line',
            data: skypeout_data
        },
        {
            name:'skypetoskype',
            type:'line',
            data: skypetoskype_data
        },
        {
            name:'smb',
            type:'line',
            data: smb_data
        },
        {
            name:'smtp',
            type:'line',
            data: smtp_data
        },
        {
            name:'socks',
            type:'line',
            data: socks_data
        },
        {
            name:'soulseek',
            type:'line',
            data: soulseek_data
        },
        {
            name:'ssh',
            type:'line',
            data: ssh_data
        },
        {
            name:'ssl',
            type:'line',
            data: ssl_data
        },
        {
            name:'stun',
            type:'line',
            data: stun_data
        },
        {
            name:'subversion',
            type:'line',
            data: subversion_data
        },
        {
            name:'teamfortress2',
            type:'line',
            data: teamfortress2_data
        },
        {
            name:'telnet',
            type:'line',
            data: telnet_data
        },
        {
            name:'validcertssl',
            type:'line',
            data: validcertssl_data
        },
        {
            name:'ventrilo',
            type:'line',
            data: ventrilo_data
        },
        {
            name:'vnc',
            type:'line',
            data: vnc_data
        },
        {
            name:'whois',
            type:'line',
            data: whois_data
        },
        {
            name:'worldofwarcraft',
            type:'line',
            data: worldofwarcraft_data
        },
        {
            name:'x11',
            type:'line',
            data: x11_data
        },
        {
            name:'xboxlive',
            type:'line',
            data: xboxlive_data
        },
        {
            name:'yahoo',
            type:'line',
            data: yahoo_data
        }
    ]
};

myChart.setOption(option);
                
setInterval(function (){

    var data_file = "http://127.0.0.1:5000/getRealTimeFlows";
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
             return false;
          }
            
       }
    }
    
    http_request.onreadystatechange = function() {
    
        if (http_request.readyState == 4  ) {
            var resp_text = http_request.responseText;
            var jsonObj = JSON.parse(resp_text);

            if (times.length >= 15) {
                aim_data.shift();
                ares_data.shift();
                armagetron_data.shift();
                battlefield2_data.shift();
                battlefield2142_data.shift();
                bittorrent_data.shift();
                counterstrike_source_data.shift();
                dhcp_data.shift();
                dns_data.shift();
                edonkey_data.shift();
                freenet_data.shift();
                ftp_data.shift();
                gnutella_data.shift();
                h323_data.shift();
                http_data.shift();
                httpaudio_data.shift();
                httpcachehit_data.shift();
                httpcachemiss_data.shift();
                http_itunes_data.shift();
                httpvideo_data.shift();
                ident_data.shift();
                imap_data.shift();
                irc_data.shift();
                jabber_data.shift();
                kugoo_data.shift();
                lpd_data.shift();
                mohaa_data.shift();
                msnmessenger_data.shift();
                nbns_data.shift();
                nntp_data.shift();
                ntp_data.shift();
                pop3_data.shift();
                pressplay_data.shift();
                qq_data.shift();
                quake_halflife_data.shift();
                radmin_data.shift();
                rlogin_data.shift();
                rtp_data.shift();
                rtsp_data.shift();
                shoutcast_data.shift();
                sip_data.shift();
                skypeout_data.shift();
                skypetoskype_data.shift();
                smb_data.shift();
                smtp_data.shift();
                socks_data.shift();
                soulseek_data.shift();
                ssh_data.shift();
                ssl_data.shift();
                stun_data.shift();
                subversion_data.shift();
                teamfortress2_data.shift();
                telnet_data.shift();
                validcertssl_data.shift();
                ventrilo_data.shift();
                vnc_data.shift();
                whois_data.shift();
                worldofwarcraft_data.shift();
                x11_data.shift();
                xboxlive_data.shift();
                yahoo_data.shift();
            }   


            aim_data.push(jsonObj.aim);
            ares_data.push(jsonObj.ares);
            armagetron_data.push(jsonObj.armagetron);
            battlefield2_data.push(jsonObj.battlefield2);
            battlefield2142_data.push(jsonObj.battlefield2142);
            bittorrent_data.push(jsonObj.bittorrent);
            counterstrike_source_data.push(jsonObj['counterstrike-source']);
            dhcp_data.push(jsonObj.dhcp);
            dns_data.push(jsonObj.dns);
            edonkey_data.push(jsonObj.edonkey);
            freenet_data.push(jsonObj.freenet);
            ftp_data.push(jsonObj.ftp);
            gnutella_data.push(jsonObj.gnutella);
            h323_data.push(jsonObj.h323);
            http_data.push(jsonObj.http);
            httpaudio_data.push(jsonObj.httpaudio);
            httpcachehit_data.push(jsonObj.httpcachehit);
            httpcachemiss_data.push(jsonObj.httpcachemiss);
            http_itunes_data.push(jsonObj['http-itunes']);
            httpvideo_data.push(jsonObj.httpvideo);
            ident_data.push(jsonObj.ident);
            imap_data.push(jsonObj.imap);
            irc_data.push(jsonObj.irc);
            jabber_data.push(jsonObj.jabber);
            kugoo_data.push(jsonObj.kugoo);
            lpd_data.push(jsonObj. lpd);
            mohaa_data.push(jsonObj.mohaa);
            msnmessenger_data.push(jsonObj.msnmessenger);
            nbns_data.push(jsonObj.nbns);
            nntp_data.push(jsonObj.nntp);
            ntp_data.push(jsonObj.ntp);
            pop3_data.push(jsonObj.pop3);
            pressplay_data.push(jsonObj.pressplay);
            qq_data.push(jsonObj.qq);
            quake_halflife_data.push(jsonObj['quake-halflife']);
            radmin_data.push(jsonObj.radmin);
            rlogin_data.push(jsonObj.rlogin);
            rtp_data.push(jsonObj.rtp);
            rtsp_data.push(jsonObj.rtsp);
            shoutcast_data.push(jsonObj.shoutcast);
            sip_data.push(jsonObj.sip);
            skypeout_data.push(jsonObj.skypeout);
            skypetoskype_data.push(jsonObj.skypetoskype);
            smb_data.push(jsonObj.smb);
            smtp_data.push(jsonObj.smtp);
            socks_data.push(jsonObj.socks);
            soulseek_data.push(jsonObj.soulseek);
            ssh_data.push(jsonObj.ssh);
            ssl_data.push(jsonObj.ssl);
            stun_data.push(jsonObj.stun);
            subversion_data.push(jsonObj.subversion);
            teamfortress2_data.push(jsonObj.teamfortress2);
            telnet_data.push(jsonObj.telnet);
            validcertssl_data.push(jsonObj.rtssl);
            ventrilo_data.push(jsonObj.validcertssl);
            vnc_data.push(jsonObj.vnc);
            whois_data.push(jsonObj.whois);
            worldofwarcraft_data.push(jsonObj.worldofwarcraft);
            x11_data.push(jsonObj.x11);
            xboxlive_data.push(jsonObj.xboxlive);
            yahoo_data.push(jsonObj.yahoo);


            if (times.length >= 15) {
                times.shift();
            }
            var parsed_time = jsonObj.time.split(' ')[4];
            times.push({
                value: parsed_time,
                textStyle: {
                    color: '#becfda;'
                }
            });

            myChart.setOption({
                series : [
                        {
                            name:'aim',
                            type:'line',
                            data: aim_data
                        },
                        {
                            name:'ares',
                            type:'line',
                            data: ares_data
                        },
                        {
                            name:'armagetron',
                            type:'line',
                            data: armagetron_data
                        },
                        {
                            name:'battlefield2',
                            type:'line',
                            data: battlefield2_data
                        },
                        {
                            name:'battlefield2142',
                            type:'line',
                            data: battlefield2142_data
                        },
                        {
                            name:'bittorrent',
                            type:'line',
                            data: bittorrent_data
                        },
                        {
                            name:'counterstrike-source',
                            type:'line',
                            data: counterstrike_source_data
                        },
                        {
                            name:'dhcp',
                            type:'line',
                            data: dhcp_data
                        },
                        {
                            name:'dns',
                            type:'line',
                            data: dns_data
                        },
                        {
                            name:'edonkey',
                            type:'line',
                            data: edonkey_data
                        },
                        {
                            name:'freenet',
                            type:'line',
                            data: freenet_data
                        },
                        {
                            name:'ftp',
                            type:'line',
                            data: ftp_data
                        },
                        {
                            name:'gnutella',
                            type:'line',
                            data: gnutella_data
                        },
                        {
                            name:'h323',
                            type:'line',
                            data: h323_data
                        },
                        {
                            name:'http',
                            type:'line',
                            data: http_data
                        },
                        {
                            name:'httpaudio',
                            type:'line',
                            data: httpaudio_data
                        },
                        {
                            name:'httpcachehit',
                            type:'line',
                            data: httpcachehit_data
                        },
                        {
                            name:'httpcachemiss',
                            type:'line',
                            data: httpcachemiss_data
                        },
                        {
                            name:'http-itunes',
                            type:'line',
                            data: http_itunes_data
                        },
                        {
                            name:'httpvideo',
                            type:'line',
                            data: httpvideo_data
                        },
                        {
                            name:'ident',
                            type:'line',
                            data: ident_data
                        },
                        {
                            name:'imap',
                            type:'line',
                            data: imap_data
                        },
                        {
                            name:'irc',
                            type:'line',
                            data: irc_data
                        },
                        {
                            name:'jabber',
                            type:'line',
                            data: jabber_data
                        },
                        {
                            name:'kugoo',
                            type:'line',
                            data: kugoo_data
                        },
                        {
                            name:'lpd',
                            type:'line',
                            data: lpd_data
                        },
                        {
                            name:'mohaa',
                            type:'line',
                            data: mohaa_data
                        },
                        {
                            name:'msnmessenger',
                            type:'line',
                            data: msnmessenger_data
                        },
                        {
                            name:'nbns',
                            type:'line',
                            data: nbns_data
                        },
                        {
                            name:'nntp',
                            type:'line',
                            data: nntp_data
                        },
                        {
                            name:'ntp',
                            type:'line',
                            data: ntp_data
                        },
                        {
                            name:'pop3',
                            type:'line',
                            data: pop3_data
                        },
                        {
                            name:'pressplay',
                            type:'line',
                            data: pressplay_data
                        },
                        {
                            name:'qq',
                            type:'line',
                            data: qq_data
                        },
                        {
                            name:'quake-halflife',
                            type:'line',
                            data: quake_halflife_data
                        },
                        {
                            name:'radmin',
                            type:'line',
                            data: radmin_data
                        },
                        {
                            name:'rlogin',
                            type:'line',
                            data: rlogin_data
                        },
                        {
                            name:'rtp',
                            type:'line',
                            data: rtp_data
                        },
                        {
                            name:'rtsp',
                            type:'line',
                            data: rtsp_data
                        },
                        {
                            name:'shoutcast',
                            type:'line',
                            data: shoutcast_data
                        },
                        {
                            name:'sip',
                            type:'line',
                            data: sip_data
                        },
                        {
                            name:'skypeout',
                            type:'line',
                            data: skypeout_data
                        },
                        {
                            name:'skypetoskype',
                            type:'line',
                            data: skypetoskype_data
                        },
                        {
                            name:'smb',
                            type:'line',
                            data: smb_data
                        },
                        {
                            name:'smtp',
                            type:'line',
                            data: smtp_data
                        },
                        {
                            name:'socks',
                            type:'line',
                            data: socks_data
                        },
                        {
                            name:'soulseek',
                            type:'line',
                            data: soulseek_data
                        },
                        {
                            name:'ssh',
                            type:'line',
                            data: ssh_data
                        },
                        {
                            name:'ssl',
                            type:'line',
                            data: ssl_data
                        },
                        {
                            name:'stun',
                            type:'line',
                            data: stun_data
                        },
                        {
                            name:'subversion',
                            type:'line',
                            data: subversion_data
                        },
                        {
                            name:'teamfortress2',
                            type:'line',
                            data: teamfortress2_data
                        },
                        {
                            name:'telnet',
                            type:'line',
                            data: telnet_data
                        },
                        {
                            name:'validcertssl',
                            type:'line',
                            data: validcertssl_data
                        },
                        {
                            name:'ventrilo',
                            type:'line',
                            data: ventrilo_data
                        },
                        {
                            name:'vnc',
                            type:'line',
                            data: vnc_data
                        },
                        {
                            name:'whois',
                            type:'line',
                            data: whois_data
                        },
                        {
                            name:'worldofwarcraft',
                            type:'line',
                            data: worldofwarcraft_data
                        },
                        {
                            name:'x11',
                            type:'line',
                            data: x11_data
                        },
                        {
                            name:'xboxlive',
                            type:'line',
                            data: xboxlive_data
                        },
                        {
                            name:'yahoo',
                            type:'line',
                            data: yahoo_data
                        }
                    ],
                xAxis : [
                    {
                        type : 'category',
                        name : 'Time',
                        nameLocation: 'middle',
                        nameTextStyle: {
                            color: '#becfda'
                        },
                        data: times,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                width: 5
                            }
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            lineStyle: {
                                color: '#becfda',
                                type: 'solid'
                            }
                        }
                    }
                ],
                legend: {
                    orient: 'vertical',
                    type: 'scroll',
                    right: 20,
                    top: 'middle',
                    bottom: 20,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    pageIconColor: "#aaa",
                    pageIconInactiveColor: "#4c5967",
                    pageTextStyle: {
                        color: '#becfda'
                    },
                    x:'right',
                    y:'center',
                    data: legendData
                }
                
            });
        }
    };
    
    http_request.open("GET", data_file, true);
    http_request.send();

}, 5000);