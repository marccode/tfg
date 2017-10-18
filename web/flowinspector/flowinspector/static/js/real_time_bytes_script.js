var myChart_bytes = echarts.init(document.getElementById('real-time-bytes'));

var times_bytes = [];

var aim_data_bytes = [];
var ares_data_bytes = [];
var armagetron_data_bytes = [];
var battlefield2_data_bytes = [];
var battlefield2142_data_bytes = [];
var bittorrent_data_bytes = [];
var counterstrike_source_data_bytes = [];
var dhcp_data_bytes = [];
var dns_data_bytes = [];
var edonkey_data_bytes = [];
var freenet_data_bytes = [];
var ftp_data_bytes = [];
var gnutella_data_bytes = [];
var h323_data_bytes = [];
var http_data_bytes = [];
var httpaudio_data_bytes = [];
var httpcachehit_data_bytes = [];
var httpcachemiss_data_bytes = [];
var http_itunes_data_bytes = [];
var httpvideo_data_bytes = [];
var ident_data_bytes = [];
var imap_data_bytes = [];
var irc_data_bytes = [];
var jabber_data_bytes = [];
var kugoo_data_bytes = [];
var lpd_data_bytes = [];
var mohaa_data_bytes = [];
var msnmessenger_data_bytes = [];
var nbns_data_bytes = [];
var nntp_data_bytes = [];
var ntp_data_bytes = [];
var pop3_data_bytes = [];
var pressplay_data_bytes = [];
var qq_data_bytes = [];
var quake_halflife_data_bytes = [];
var radmin_data_bytes = [];
var rlogin_data_bytes = [];
var rtp_data_bytes = [];
var rtsp_data_bytes = [];
var shoutcast_data_bytes = [];
var sip_data_bytes = [];
var skypeout_data_bytes = [];
var skypetoskype_data_bytes = [];
var smb_data_bytes = [];
var smtp_data_bytes = [];
var socks_data_bytes = [];
var soulseek_data_bytes = [];
var ssh_data_bytes = [];
var ssl_data_bytes = [];
var stun_data_bytes = [];
var subversion_data_bytes = [];
var teamfortress2_data_bytes = [];
var telnet_data_bytes = [];
var validcertssl_data_bytes = [];
var ventrilo_data_bytes = [];
var vnc_data_bytes = [];
var whois_data_bytes = [];
var worldofwarcraft_data_bytes = [];
var x11_data_bytes = [];
var xboxlive_data_bytes = [];
var yahoo_data_bytes = [];

var legendData_bytes = ['aim', 'ares', 'armagetron', 'battlefield2', 'battlefield2142', 'bittorrent', 'counterstrike-source', 'dhcp', 'dns', 'edonkey', 'freenet', 'ftp', 'gnutella', 'h323', 'http', 'httpaudio', 'httpcachehit', 'httpcachemiss', 'http-itunes', 'httpvideo', 'ident', 'imap', 'irc', 'jabber', 'kugoo', 'lpd', 'mohaa', 'msnmessenger', 'nbns', 'nntp', 'ntp', 'pop3', 'pressplay', 'qq', 'quake-halflife', 'radmin', 'rlogin', 'rtp', 'rtsp', 'shoutcast', 'sip', 'skypeout', 'skypetoskype', 'smb', 'smtp', 'socks', 'soulseek', 'ssh', 'ssl', 'stun', 'subversion', 'teamfortress2', 'telnet', 'validcertssl', 'ventrilo', 'vnc', 'whois', 'worldofwarcraft', 'x11', 'xboxlive', 'yahoo'];


var option_bytes = {
    backgroundColor: '#2c343c',
    title : {
        text: 'Real Time Bytes',
        subtext: 'Realtime graph of all the classified bytes',
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
            nameGap: 65
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale: false,
            name : 'Number of bytes',
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
            nameGap: 65
        }
    ],
    series : [
        {
            name:'aim',
            type:'line',
            data: aim_data_bytes
        },
        {
            name:'ares',
            type:'line',
            data: ares_data_bytes
        },
        {
            name:'armagetron',
            type:'line',
            data: armagetron_data_bytes
        },
        {
            name:'battlefield2',
            type:'line',
            data: battlefield2_data_bytes
        },
        {
            name:'battlefield2142',
            type:'line',
            data: battlefield2142_data_bytes
        },
        {
            name:'bittorrent',
            type:'line',
            data: bittorrent_data_bytes
        },
        {
            name:'counterstrike-source',
            type:'line',
            data: counterstrike_source_data_bytes
        },
        {
            name:'dhcp',
            type:'line',
            data: dhcp_data_bytes
        },
        {
            name:'dns',
            type:'line',
            data: dns_data_bytes
        },
        {
            name:'edonkey',
            type:'line',
            data: edonkey_data_bytes
        },
        {
            name:'freenet',
            type:'line',
            data: freenet_data_bytes
        },
        {
            name:'ftp',
            type:'line',
            data: ftp_data_bytes
        },
        {
            name:'gnutella',
            type:'line',
            data: gnutella_data_bytes
        },
        {
            name:'h323',
            type:'line',
            data: h323_data_bytes
        },
        {
            name:'http',
            type:'line',
            data: http_data_bytes
        },
        {
            name:'httpaudio',
            type:'line',
            data: httpaudio_data_bytes
        },
        {
            name:'httpcachehit',
            type:'line',
            data: httpcachehit_data_bytes
        },
        {
            name:'httpcachemiss',
            type:'line',
            data: httpcachemiss_data_bytes
        },
        {
            name:'http-itunes',
            type:'line',
            data: http_itunes_data_bytes
        },
        {
            name:'httpvideo',
            type:'line',
            data: httpvideo_data_bytes
        },
        {
            name:'ident',
            type:'line',
            data: ident_data_bytes
        },
        {
            name:'imap',
            type:'line',
            data: imap_data_bytes
        },
        {
            name:'irc',
            type:'line',
            data: irc_data_bytes
        },
        {
            name:'jabber',
            type:'line',
            data: jabber_data_bytes
        },
        {
            name:'kugoo',
            type:'line',
            data: kugoo_data_bytes
        },
        {
            name:'lpd',
            type:'line',
            data: lpd_data_bytes
        },
        {
            name:'mohaa',
            type:'line',
            data: mohaa_data_bytes
        },
        {
            name:'msnmessenger',
            type:'line',
            data: msnmessenger_data_bytes
        },
        {
            name:'nbns',
            type:'line',
            data: nbns_data_bytes
        },
        {
            name:'nntp',
            type:'line',
            data: nntp_data_bytes
        },
        {
            name:'ntp',
            type:'line',
            data: ntp_data_bytes
        },
        {
            name:'pop3',
            type:'line',
            data: pop3_data_bytes
        },
        {
            name:'pressplay',
            type:'line',
            data: pressplay_data_bytes
        },
        {
            name:'qq',
            type:'line',
            data: qq_data_bytes
        },
        {
            name:'quake-halflife',
            type:'line',
            data: quake_halflife_data_bytes
        },
        {
            name:'radmin',
            type:'line',
            data: radmin_data_bytes
        },
        {
            name:'rlogin',
            type:'line',
            data: rlogin_data_bytes
        },
        {
            name:'rtp',
            type:'line',
            data: rtp_data_bytes
        },
        {
            name:'rtsp',
            type:'line',
            data: rtsp_data_bytes
        },
        {
            name:'shoutcast',
            type:'line',
            data: shoutcast_data_bytes
        },
        {
            name:'sip',
            type:'line',
            data: sip_data_bytes
        },
        {
            name:'skypeout',
            type:'line',
            data: skypeout_data_bytes
        },
        {
            name:'skypetoskype',
            type:'line',
            data: skypetoskype_data_bytes
        },
        {
            name:'smb',
            type:'line',
            data: smb_data_bytes
        },
        {
            name:'smtp',
            type:'line',
            data: smtp_data_bytes
        },
        {
            name:'socks',
            type:'line',
            data: socks_data_bytes
        },
        {
            name:'soulseek',
            type:'line',
            data: soulseek_data_bytes
        },
        {
            name:'ssh',
            type:'line',
            data: ssh_data_bytes
        },
        {
            name:'ssl',
            type:'line',
            data: ssl_data_bytes
        },
        {
            name:'stun',
            type:'line',
            data: stun_data_bytes
        },
        {
            name:'subversion',
            type:'line',
            data: subversion_data_bytes
        },
        {
            name:'teamfortress2',
            type:'line',
            data: teamfortress2_data_bytes
        },
        {
            name:'telnet',
            type:'line',
            data: telnet_data_bytes
        },
        {
            name:'validcertssl',
            type:'line',
            data: validcertssl_data_bytes
        },
        {
            name:'ventrilo',
            type:'line',
            data: ventrilo_data_bytes
        },
        {
            name:'vnc',
            type:'line',
            data: vnc_data_bytes
        },
        {
            name:'whois',
            type:'line',
            data: whois_data_bytes
        },
        {
            name:'worldofwarcraft',
            type:'line',
            data: worldofwarcraft_data_bytes
        },
        {
            name:'x11',
            type:'line',
            data: x11_data_bytes
        },
        {
            name:'xboxlive',
            type:'line',
            data: xboxlive_data_bytes
        },
        {
            name:'yahoo',
            type:'line',
            data: yahoo_data_bytes
        }
    ]
};

myChart_bytes.setOption(option_bytes);
                
setInterval(function (){

    var data_file_bytes = "http://127.0.0.1:5000/getRealTimeBytes";
    var http_request_bytes = new XMLHttpRequest();
    try {
       // Opera 8.0+, Firefox, Chrome, Safari
       http_request_bytes = new XMLHttpRequest();
    }catch(e) {
       // Internet Explorer Browsers
       try {
          http_request_bytes = new ActiveXObject("Msxml2.XMLHTTP");
            
       } catch(e) {
        
          try {
             http_request_bytes = new ActiveXObject("Microsoft.XMLHTTP");
          } catch(e) {
             // Something went wrong
             alert("Your browser broke!");
             return false;
          }
            
       }
    }
    
    http_request_bytes.onreadystatechange = function() {
    
        if (http_request_bytes.readyState == 4  ) {
            var resp_text_bytes = http_request_bytes.responseText;
            var jsonObj_bytes = JSON.parse(resp_text_bytes);

            if (times.length >= 15) {
                aim_data_bytes.shift();
                ares_data_bytes.shift();
                armagetron_data_bytes.shift();
                battlefield2_data_bytes.shift();
                battlefield2142_data_bytes.shift();
                bittorrent_data_bytes.shift();
                counterstrike_source_data_bytes.shift();
                dhcp_data_bytes.shift();
                dns_data_bytes.shift();
                edonkey_data_bytes.shift();
                freenet_data_bytes.shift();
                ftp_data_bytes.shift();
                gnutella_data_bytes.shift();
                h323_data_bytes.shift();
                http_data_bytes.shift();
                httpaudio_data_bytes.shift();
                httpcachehit_data_bytes.shift();
                httpcachemiss_data_bytes.shift();
                http_itunes_data_bytes.shift();
                httpvideo_data_bytes.shift();
                ident_data_bytes.shift();
                imap_data_bytes.shift();
                irc_data_bytes.shift();
                jabber_data_bytes.shift();
                kugoo_data_bytes.shift();
                lpd_data_bytes.shift();
                mohaa_data_bytes.shift();
                msnmessenger_data_bytes.shift();
                nbns_data_bytes.shift();
                nntp_data_bytes.shift();
                ntp_data_bytes.shift();
                pop3_data_bytes.shift();
                pressplay_data_bytes.shift();
                qq_data_bytes.shift();
                quake_halflife_data_bytes.shift();
                radmin_data_bytes.shift();
                rlogin_data_bytes.shift();
                rtp_data_bytes.shift();
                rtsp_data_bytes.shift();
                shoutcast_data_bytes.shift();
                sip_data_bytes.shift();
                skypeout_data_bytes.shift();
                skypetoskype_data_bytes.shift();
                smb_data_bytes.shift();
                smtp_data_bytes.shift();
                socks_data_bytes.shift();
                soulseek_data_bytes.shift();
                ssh_data_bytes.shift();
                ssl_data_bytes.shift();
                stun_data_bytes.shift();
                subversion_data_bytes.shift();
                teamfortress2_data_bytes.shift();
                telnet_data_bytes.shift();
                validcertssl_data_bytes.shift();
                ventrilo_data_bytes.shift();
                vnc_data_bytes.shift();
                whois_data_bytes.shift();
                worldofwarcraft_data_bytes.shift();
                x11_data_bytes.shift();
                xboxlive_data_bytes.shift();
                yahoo_data_bytes.shift();
            }  


            aim_data_bytes.push(jsonObj_bytes.aim);
            ares_data_bytes.push(jsonObj_bytes.ares);
            armagetron_data_bytes.push(jsonObj_bytes.armagetron);
            battlefield2_data_bytes.push(jsonObj_bytes.battlefield2);
            battlefield2142_data_bytes.push(jsonObj_bytes.battlefield2142);
            bittorrent_data_bytes.push(jsonObj_bytes.bittorrent);
            counterstrike_source_data_bytes.push(jsonObj_bytes['counterstrike-source']);
            dhcp_data_bytes.push(jsonObj_bytes.dhcp);
            dns_data_bytes.push(jsonObj_bytes.dns);
            edonkey_data_bytes.push(jsonObj_bytes.edonkey);
            freenet_data_bytes.push(jsonObj_bytes.freenet);
            ftp_data_bytes.push(jsonObj_bytes.ftp);
            gnutella_data_bytes.push(jsonObj_bytes.gnutella);
            h323_data_bytes.push(jsonObj_bytes.h323);
            http_data_bytes.push(jsonObj_bytes.http);
            httpaudio_data_bytes.push(jsonObj_bytes.httpaudio);
            httpcachehit_data_bytes.push(jsonObj_bytes.httpcachehit);
            httpcachemiss_data_bytes.push(jsonObj_bytes.httpcachemiss);
            http_itunes_data_bytes.push(jsonObj_bytes['http-itunes']);
            httpvideo_data_bytes.push(jsonObj_bytes.httpvideo);
            ident_data_bytes.push(jsonObj_bytes.ident);
            imap_data_bytes.push(jsonObj_bytes.imap);
            irc_data_bytes.push(jsonObj_bytes.irc);
            jabber_data_bytes.push(jsonObj_bytes.jabber);
            kugoo_data_bytes.push(jsonObj_bytes.kugoo);
            lpd_data_bytes.push(jsonObj_bytes. lpd);
            mohaa_data_bytes.push(jsonObj_bytes.mohaa);
            msnmessenger_data_bytes.push(jsonObj_bytes.msnmessenger);
            nbns_data_bytes.push(jsonObj_bytes.nbns);
            nntp_data_bytes.push(jsonObj_bytes.nntp);
            ntp_data_bytes.push(jsonObj_bytes.ntp);
            pop3_data_bytes.push(jsonObj_bytes.pop3);
            pressplay_data_bytes.push(jsonObj_bytes.pressplay);
            qq_data_bytes.push(jsonObj_bytes.qq);
            quake_halflife_data_bytes.push(jsonObj_bytes['quake-halflife']);
            radmin_data_bytes.push(jsonObj_bytes.radmin);
            rlogin_data_bytes.push(jsonObj_bytes.rlogin);
            rtp_data_bytes.push(jsonObj_bytes.rtp);
            rtsp_data_bytes.push(jsonObj_bytes.rtsp);
            shoutcast_data_bytes.push(jsonObj_bytes.shoutcast);
            sip_data_bytes.push(jsonObj_bytes.sip);
            skypeout_data_bytes.push(jsonObj_bytes.skypeout);
            skypetoskype_data_bytes.push(jsonObj_bytes.skypetoskype);
            smb_data_bytes.push(jsonObj_bytes.smb);
            smtp_data_bytes.push(jsonObj_bytes.smtp);
            socks_data_bytes.push(jsonObj_bytes.socks);
            soulseek_data_bytes.push(jsonObj_bytes.soulseek);
            ssh_data_bytes.push(jsonObj_bytes.ssh);
            ssl_data_bytes.push(jsonObj_bytes.ssl);
            stun_data_bytes.push(jsonObj_bytes.stun);
            subversion_data_bytes.push(jsonObj_bytes.subversion);
            teamfortress2_data_bytes.push(jsonObj_bytes.teamfortress2);
            telnet_data_bytes.push(jsonObj_bytes.telnet);
            validcertssl_data_bytes.push(jsonObj_bytes.rtssl);
            ventrilo_data_bytes.push(jsonObj_bytes.validcertssl);
            vnc_data_bytes.push(jsonObj_bytes.vnc);
            whois_data_bytes.push(jsonObj_bytes.whois);
            worldofwarcraft_data_bytes.push(jsonObj_bytes.worldofwarcraft);
            x11_data_bytes.push(jsonObj_bytes.x11);
            xboxlive_data_bytes.push(jsonObj_bytes.xboxlive);
            yahoo_data_bytes.push(jsonObj_bytes.yahoo);

            if (times_bytes.length >= 15) {
                times_bytes.shift();
            }
            var parsed_time_bytes = jsonObj_bytes.time.split(' ')[4];
            times_bytes.push({
                value: parsed_time_bytes,
                textStyle: {
                    color: '#becfda;'
                }
            });

            myChart_bytes.setOption({
                series : [
                        {
                            name:'aim',
                            type:'line',
                            data: aim_data_bytes
                        },
                        {
                            name:'ares',
                            type:'line',
                            data: ares_data_bytes
                        },
                        {
                            name:'armagetron',
                            type:'line',
                            data: armagetron_data_bytes
                        },
                        {
                            name:'battlefield2',
                            type:'line',
                            data: battlefield2_data_bytes
                        },
                        {
                            name:'battlefield2142',
                            type:'line',
                            data: battlefield2142_data_bytes
                        },
                        {
                            name:'bittorrent',
                            type:'line',
                            data: bittorrent_data_bytes
                        },
                        {
                            name:'counterstrike-source',
                            type:'line',
                            data: counterstrike_source_data_bytes
                        },
                        {
                            name:'dhcp',
                            type:'line',
                            data: dhcp_data_bytes
                        },
                        {
                            name:'dns',
                            type:'line',
                            data: dns_data_bytes
                        },
                        {
                            name:'edonkey',
                            type:'line',
                            data: edonkey_data_bytes
                        },
                        {
                            name:'freenet',
                            type:'line',
                            data: freenet_data_bytes
                        },
                        {
                            name:'ftp',
                            type:'line',
                            data: ftp_data_bytes
                        },
                        {
                            name:'gnutella',
                            type:'line',
                            data: gnutella_data_bytes
                        },
                        {
                            name:'h323',
                            type:'line',
                            data: h323_data_bytes
                        },
                        {
                            name:'http',
                            type:'line',
                            data: http_data_bytes
                        },
                        {
                            name:'httpaudio',
                            type:'line',
                            data: httpaudio_data_bytes
                        },
                        {
                            name:'httpcachehit',
                            type:'line',
                            data: httpcachehit_data_bytes
                        },
                        {
                            name:'httpcachemiss',
                            type:'line',
                            data: httpcachemiss_data_bytes
                        },
                        {
                            name:'http-itunes',
                            type:'line',
                            data: http_itunes_data_bytes
                        },
                        {
                            name:'httpvideo',
                            type:'line',
                            data: httpvideo_data_bytes
                        },
                        {
                            name:'ident',
                            type:'line',
                            data: ident_data_bytes
                        },
                        {
                            name:'imap',
                            type:'line',
                            data: imap_data_bytes
                        },
                        {
                            name:'irc',
                            type:'line',
                            data: irc_data_bytes
                        },
                        {
                            name:'jabber',
                            type:'line',
                            data: jabber_data_bytes
                        },
                        {
                            name:'kugoo',
                            type:'line',
                            data: kugoo_data_bytes
                        },
                        {
                            name:'lpd',
                            type:'line',
                            data: lpd_data_bytes
                        },
                        {
                            name:'mohaa',
                            type:'line',
                            data: mohaa_data_bytes
                        },
                        {
                            name:'msnmessenger',
                            type:'line',
                            data: msnmessenger_data_bytes
                        },
                        {
                            name:'nbns',
                            type:'line',
                            data: nbns_data_bytes
                        },
                        {
                            name:'nntp',
                            type:'line',
                            data: nntp_data_bytes
                        },
                        {
                            name:'ntp',
                            type:'line',
                            data: ntp_data_bytes
                        },
                        {
                            name:'pop3',
                            type:'line',
                            data: pop3_data_bytes
                        },
                        {
                            name:'pressplay',
                            type:'line',
                            data: pressplay_data_bytes
                        },
                        {
                            name:'qq',
                            type:'line',
                            data: qq_data_bytes
                        },
                        {
                            name:'quake-halflife',
                            type:'line',
                            data: quake_halflife_data_bytes
                        },
                        {
                            name:'radmin',
                            type:'line',
                            data: radmin_data_bytes
                        },
                        {
                            name:'rlogin',
                            type:'line',
                            data: rlogin_data_bytes
                        },
                        {
                            name:'rtp',
                            type:'line',
                            data: rtp_data_bytes
                        },
                        {
                            name:'rtsp',
                            type:'line',
                            data: rtsp_data_bytes
                        },
                        {
                            name:'shoutcast',
                            type:'line',
                            data: shoutcast_data_bytes
                        },
                        {
                            name:'sip',
                            type:'line',
                            data: sip_data_bytes
                        },
                        {
                            name:'skypeout',
                            type:'line',
                            data: skypeout_data_bytes
                        },
                        {
                            name:'skypetoskype',
                            type:'line',
                            data: skypetoskype_data_bytes
                        },
                        {
                            name:'smb',
                            type:'line',
                            data: smb_data_bytes
                        },
                        {
                            name:'smtp',
                            type:'line',
                            data: smtp_data_bytes
                        },
                        {
                            name:'socks',
                            type:'line',
                            data: socks_data_bytes
                        },
                        {
                            name:'soulseek',
                            type:'line',
                            data: soulseek_data_bytes
                        },
                        {
                            name:'ssh',
                            type:'line',
                            data: ssh_data_bytes
                        },
                        {
                            name:'ssl',
                            type:'line',
                            data: ssl_data_bytes
                        },
                        {
                            name:'stun',
                            type:'line',
                            data: stun_data_bytes
                        },
                        {
                            name:'subversion',
                            type:'line',
                            data: subversion_data_bytes
                        },
                        {
                            name:'teamfortress2',
                            type:'line',
                            data: teamfortress2_data_bytes
                        },
                        {
                            name:'telnet',
                            type:'line',
                            data: telnet_data_bytes
                        },
                        {
                            name:'validcertssl',
                            type:'line',
                            data: validcertssl_data_bytes
                        },
                        {
                            name:'ventrilo',
                            type:'line',
                            data: ventrilo_data_bytes
                        },
                        {
                            name:'vnc',
                            type:'line',
                            data: vnc_data_bytes
                        },
                        {
                            name:'whois',
                            type:'line',
                            data: whois_data_bytes
                        },
                        {
                            name:'worldofwarcraft',
                            type:'line',
                            data: worldofwarcraft_data_bytes
                        },
                        {
                            name:'x11',
                            type:'line',
                            data: x11_data_bytes
                        },
                        {
                            name:'xboxlive',
                            type:'line',
                            data: xboxlive_data_bytes
                        },
                        {
                            name:'yahoo',
                            type:'line',
                            data: yahoo_data_bytes
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
                    data: legendData_bytes
                }
                
            });
        }
    };
    
    http_request_bytes.open("GET", data_file_bytes, true);
    http_request_bytes.send();

}, 5000);