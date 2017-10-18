# all the imports
import os
#import mysql.connector as mariadb
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flaskext.mysql import MySQL

from flask import json

app = Flask(__name__) # create the application instance :)
app.config.from_object(__name__) # load config from this file , flaskr.py

# Load default config and override config from an environment variable
app.config.update(dict(
    #DATABASE=os.path.join(app.root_path, 'flowinspector.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default',
    MYSQL_DATABASE_HOST='localhost',
    MYSQL_DATABASE_PORT=3306,
    MYSQL_DATABASE_USER='NOPE', # CHANGE
    MYSQL_DATABASE_PASSWORD='NOPE', # CHANGE
    MYSQL_DATABASE_DB='flowinspector'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)
mysql = MySQL()
mysql.init_app(app)

def connect_db():
    """Connects to the specific database."""
    #rv = sqlite3.connect(current_app.config['DATABASE'])
    #rv.row_factory = sqlite3.Row
    #return rv
    mysql = MySQL()
    mysql.init_app(app)
    return mysql


def query_db(query):
    #cur = get_db().execute(query, args)
    #rv = cur.fetchall()
    #cur.close()
    #return (rv[0] if rv else None) if one else rv
    cursor = get_db()
    cursor.execute(query)
    return cursor.fetchall()

def init_db():
    """Initializes the database."""
    db = get_db()
    with current_app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """

    #if not hasattr(g, 'sqlite_db'):
    #    g.sqlite_db = connect_db()
    #return g.sqlite_db

    #mysql = connect_db()
    return mysql.connect().cursor()
    #cursor = mysql.get_db()

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/')
def index():
    """Shows a users timeline or if no user is logged in it will
    redirect to the public timeline.  This timeline shows the user's
    messages as well as all the messages of followed users.
    """

@app.route('/getNumTraces')
def getNumTraces():
    data = query_db('''select count(1) from traces where received in max(received)''')

@app.route('/getLatency')
def getLatency():
    a = 1
    
@app.route('/getBytes')
def getBytes():
    data = query_db('''select sum(bytes) from traces where received in max(received)''')


@app.route('/getHistoricalBytesData')
def getHistoricalBytesData():
    data = query_db('''select   sum(case when predictedLabel='aim' then bytes else 0 end),
                                sum(case when predictedLabel='ares' then bytes else 0 end),
                                sum(case when predictedLabel='armagetron' then bytes else 0 end),
                                sum(case when predictedLabel='battlefield2' then bytes else 0 end),
                                sum(case when predictedLabel='battlefield2bytes42' then bytes else 0 end),
                                sum(case when predictedLabel='bittorrent' then bytes else 0 end),
                                sum(case when predictedLabel='sumerstrike-source' then bytes else 0 end),
                                sum(case when predictedLabel='dhcp' then bytes else 0 end),
                                sum(case when predictedLabel='dns' then bytes else 0 end),
                                sum(case when predictedLabel='edonkey' then bytes else 0 end),
                                sum(case when predictedLabel='freenet' then bytes else 0 end),
                                sum(case when predictedLabel='ftp' then bytes else 0 end),
                                sum(case when predictedLabel='gnutella' then bytes else 0 end),
                                sum(case when predictedLabel='h323' then bytes else 0 end),
                                sum(case when predictedLabel='http' then bytes else 0 end),
                                sum(case when predictedLabel='httpaudio' then bytes else 0 end),
                                sum(case when predictedLabel='httpcachehit' then bytes else 0 end),
                                sum(case when predictedLabel='httpcachemiss' then bytes else 0 end),
                                sum(case when predictedLabel='http-itunes' then bytes else 0 end),
                                sum(case when predictedLabel='httpvideo' then bytes else 0 end),
                                sum(case when predictedLabel='ident' then bytes else 0 end),
                                sum(case when predictedLabel='imap' then bytes else 0 end),
                                sum(case when predictedLabel='irc' then bytes else 0 end),
                                sum(case when predictedLabel='jabber' then bytes else 0 end),
                                sum(case when predictedLabel='kugoo' then bytes else 0 end),
                                sum(case when predictedLabel='lpd' then bytes else 0 end),
                                sum(case when predictedLabel='mohaa' then bytes else 0 end),
                                sum(case when predictedLabel='msnmessenger' then bytes else 0 end),
                                sum(case when predictedLabel='nbns' then bytes else 0 end),
                                sum(case when predictedLabel='nntp' then bytes else 0 end),
                                sum(case when predictedLabel='ntp' then bytes else 0 end),
                                sum(case when predictedLabel='pop3' then bytes else 0 end),
                                sum(case when predictedLabel='pressplay' then bytes else 0 end),
                                sum(case when predictedLabel='qq' then bytes else 0 end),
                                sum(case when predictedLabel='quake-halflife' then bytes else 0 end),
                                sum(case when predictedLabel='radmin' then bytes else 0 end),
                                sum(case when predictedLabel='rlogin' then bytes else 0 end),
                                sum(case when predictedLabel='rtp' then bytes else 0 end),
                                sum(case when predictedLabel='rtsp' then bytes else 0 end),
                                sum(case when predictedLabel='shoutcast' then bytes else 0 end),
                                sum(case when predictedLabel='sip' then bytes else 0 end),
                                sum(case when predictedLabel='skypeout' then bytes else 0 end),
                                sum(case when predictedLabel='skypetoskype' then bytes else 0 end),
                                sum(case when predictedLabel='smb' then bytes else 0 end),
                                sum(case when predictedLabel='smtp' then bytes else 0 end),
                                sum(case when predictedLabel='socks' then bytes else 0 end),
                                sum(case when predictedLabel='soulseek' then bytes else 0 end),
                                sum(case when predictedLabel='ssh' then bytes else 0 end),
                                sum(case when predictedLabel='ssl' then bytes else 0 end),
                                sum(case when predictedLabel='stun' then bytes else 0 end),
                                sum(case when predictedLabel='subversion' then bytes else 0 end),
                                sum(case when predictedLabel='teamfortress2' then bytes else 0 end),
                                sum(case when predictedLabel='telnet' then bytes else 0 end),
                                sum(case when predictedLabel='validcertssl' then bytes else 0 end),
                                sum(case when predictedLabel='ventrilo' then bytes else 0 end),
                                sum(case when predictedLabel='vnc' then bytes else 0 end),
                                sum(case when predictedLabel='whois' then bytes else 0 end),
                                sum(case when predictedLabel='worldofwarcraft' then bytes else 0 end),
                                sum(case when predictedLabel='x11' then bytes else 0 end),
                                sum(case when predictedLabel='xboxlive' then bytes else 0 end),
                                sum(case when predictedLabel='yahoo' then bytes else 0 end) from traces''')

    if data is None:
        return render_template('if.html')
    else:
        for row in data:
            return json.dumps({ 'aim':int(row[0]),
                                'ares':int(row[1]),
                                'armagetron':int(row[2]),
                                'battlefield2':int(row[3]),
                                'battlefield2142':int(row[4]),
                                'bittorrent':int(row[5]),
                                'counterstrike-source':int(row[6]),
                                'dhcp':int(row[7]),
                                'dns':int(row[8]),
                                'edonkey':int(row[9]),
                                'freenet':int(row[10]),
                                'ftp':int(row[11]),
                                'gnutella':int(row[12]),
                                'h323':int(row[13]),
                                'http':int(row[14]),
                                'httpaudio':int(row[15]),
                                'httpcachehit':int(row[16]),
                                'httpcachemiss':int(row[17]),
                                'http-itunes':int(row[18]),
                                'httpvideo':int(row[19]),
                                'ident':int(row[20]),
                                'imap':int(row[21]),
                                'irc':int(row[22]),
                                'jabber':int(row[23]),
                                'kugoo':int(row[24]),
                                'lpd':int(row[25]),
                                'mohaa':int(row[26]),
                                'msnmessenger':int(row[27]),
                                'nbns':int(row[28]),
                                'nntp':int(row[29]),
                                'ntp':int(row[30]),
                                'pop3':int(row[31]),
                                'pressplay':int(row[32]),
                                'qq':int(row[33]),
                                'quake-halflife':int(row[34]),
                                'radmin':int(row[35]),
                                'rlogin':int(row[36]),
                                'rtp':int(row[37]),
                                'rtsp':int(row[38]),
                                'shoutcast':int(row[39]),
                                'sip':int(row[40]),
                                'skypeout':int(row[41]),
                                'skypetoskype':int(row[42]),
                                'smb':int(row[43]),
                                'smtp':int(row[44]),
                                'socks':int(row[45]),
                                'soulseek':int(row[46]),
                                'ssh':int(row[47]),
                                'ssl':int(row[48]),
                                'stun':int(row[49]),
                                'subversion':int(row[50]),
                                'teamfortress2':int(row[51]),
                                'telnet':int(row[52]),
                                'validcertssl':int(row[53]),
                                'ventrilo':int(row[54]),
                                'vnc':int(row[55]),
                                'whois':int(row[56]),
                                'worldofwarcraft':int(row[57]),
                                'x11':int(row[58]),
                                'xboxlive':int(row[59]),
                                'yahoo':int(row[60])});

@app.route('/getHistoricalFlowsData')
def getHistoricalFlowsData():
    data = query_db('''select   count(case when predictedLabel='aim' then 1 else null end),
                                count(case when predictedLabel='ares' then 1 else null end),
                                count(case when predictedLabel='armagetron' then 1 else null end),
                                count(case when predictedLabel='battlefield2' then 1 else null end),
                                count(case when predictedLabel='battlefield2142' then 1 else null end),
                                count(case when predictedLabel='bittorrent' then 1 else null end),
                                count(case when predictedLabel='counterstrike-source' then 1 else null end),
                                count(case when predictedLabel='dhcp' then 1 else null end),
                                count(case when predictedLabel='dns' then 1 else null end),
                                count(case when predictedLabel='edonkey' then 1 else null end),
                                count(case when predictedLabel='freenet' then 1 else null end),
                                count(case when predictedLabel='ftp' then 1 else null end),
                                count(case when predictedLabel='gnutella' then 1 else null end),
                                count(case when predictedLabel='h323' then 1 else null end),
                                count(case when predictedLabel='http' then 1 else null end),
                                count(case when predictedLabel='httpaudio' then 1 else null end),
                                count(case when predictedLabel='httpcachehit' then 1 else null end),
                                count(case when predictedLabel='httpcachemiss' then 1 else null end),
                                count(case when predictedLabel='http-itunes' then 1 else null end),
                                count(case when predictedLabel='httpvideo' then 1 else null end),
                                count(case when predictedLabel='ident' then 1 else null end),
                                count(case when predictedLabel='imap' then 1 else null end),
                                count(case when predictedLabel='irc' then 1 else null end),
                                count(case when predictedLabel='jabber' then 1 else null end),
                                count(case when predictedLabel='kugoo' then 1 else null end),
                                count(case when predictedLabel='lpd' then 1 else null end),
                                count(case when predictedLabel='mohaa' then 1 else null end),
                                count(case when predictedLabel='msnmessenger' then 1 else null end),
                                count(case when predictedLabel='nbns' then 1 else null end),
                                count(case when predictedLabel='nntp' then 1 else null end),
                                count(case when predictedLabel='ntp' then 1 else null end),
                                count(case when predictedLabel='pop3' then 1 else null end),
                                count(case when predictedLabel='pressplay' then 1 else null end),
                                count(case when predictedLabel='qq' then 1 else null end),
                                count(case when predictedLabel='quake-halflife' then 1 else null end),
                                count(case when predictedLabel='radmin' then 1 else null end),
                                count(case when predictedLabel='rlogin' then 1 else null end),
                                count(case when predictedLabel='rtp' then 1 else null end),
                                count(case when predictedLabel='rtsp' then 1 else null end),
                                count(case when predictedLabel='shoutcast' then 1 else null end),
                                count(case when predictedLabel='sip' then 1 else null end),
                                count(case when predictedLabel='skypeout' then 1 else null end),
                                count(case when predictedLabel='skypetoskype' then 1 else null end),
                                count(case when predictedLabel='smb' then 1 else null end),
                                count(case when predictedLabel='smtp' then 1 else null end),
                                count(case when predictedLabel='socks' then 1 else null end),
                                count(case when predictedLabel='soulseek' then 1 else null end),
                                count(case when predictedLabel='ssh' then 1 else null end),
                                count(case when predictedLabel='ssl' then 1 else null end),
                                count(case when predictedLabel='stun' then 1 else null end),
                                count(case when predictedLabel='subversion' then 1 else null end),
                                count(case when predictedLabel='teamfortress2' then 1 else null end),
                                count(case when predictedLabel='telnet' then 1 else null end),
                                count(case when predictedLabel='validcertssl' then 1 else null end),
                                count(case when predictedLabel='ventrilo' then 1 else null end),
                                count(case when predictedLabel='vnc' then 1 else null end),
                                count(case when predictedLabel='whois' then 1 else null end),
                                count(case when predictedLabel='worldofwarcraft' then 1 else null end),
                                count(case when predictedLabel='x11' then 1 else null end),
                                count(case when predictedLabel='xboxlive' then 1 else null end),
                                count(case when predictedLabel='yahoo' then 1 else null end) from traces''')

    if data is None:
        return render_template('if.html')
    else:
        for row in data:
            return json.dumps({ 'aim':int(row[0]),
                                'ares':int(row[1]),
                                'armagetron':int(row[2]),
                                'battlefield2':int(row[3]),
                                'battlefield2142':int(row[4]),
                                'bittorrent':int(row[5]),
                                'counterstrike-source':int(row[6]),
                                'dhcp':int(row[7]),
                                'dns':int(row[8]),
                                'edonkey':int(row[9]),
                                'freenet':int(row[10]),
                                'ftp':int(row[11]),
                                'gnutella':int(row[12]),
                                'h323':int(row[13]),
                                'http':int(row[14]),
                                'httpaudio':int(row[15]),
                                'httpcachehit':int(row[16]),
                                'httpcachemiss':int(row[17]),
                                'http-itunes':int(row[18]),
                                'httpvideo':int(row[19]),
                                'ident':int(row[20]),
                                'imap':int(row[21]),
                                'irc':int(row[22]),
                                'jabber':int(row[23]),
                                'kugoo':int(row[24]),
                                'lpd':int(row[25]),
                                'mohaa':int(row[26]),
                                'msnmessenger':int(row[27]),
                                'nbns':int(row[28]),
                                'nntp':int(row[29]),
                                'ntp':int(row[30]),
                                'pop3':int(row[31]),
                                'pressplay':int(row[32]),
                                'qq':int(row[33]),
                                'quake-halflife':int(row[34]),
                                'radmin':int(row[35]),
                                'rlogin':int(row[36]),
                                'rtp':int(row[37]),
                                'rtsp':int(row[38]),
                                'shoutcast':int(row[39]),
                                'sip':int(row[40]),
                                'skypeout':int(row[41]),
                                'skypetoskype':int(row[42]),
                                'smb':int(row[43]),
                                'smtp':int(row[44]),
                                'socks':int(row[45]),
                                'soulseek':int(row[46]),
                                'ssh':int(row[47]),
                                'ssl':int(row[48]),
                                'stun':int(row[49]),
                                'subversion':int(row[50]),
                                'teamfortress2':int(row[51]),
                                'telnet':int(row[52]),
                                'validcertssl':int(row[53]),
                                'ventrilo':int(row[54]),
                                'vnc':int(row[55]),
                                'whois':int(row[56]),
                                'worldofwarcraft':int(row[57]),
                                'x11':int(row[58]),
                                'xboxlive':int(row[59]),
                                'yahoo':int(row[60])});


@app.route('/getRealTimeFlows')
def getRealTimeFlows():
    data = query_db('''select   count(case when predictedLabel='aim' then 1 else null end),
                                count(case when predictedLabel='ares' then 1 else null end),
                                count(case when predictedLabel='armagetron' then 1 else null end),
                                count(case when predictedLabel='battlefield2' then 1 else null end),
                                count(case when predictedLabel='battlefield2142' then 1 else null end),
                                count(case when predictedLabel='bittorrent' then 1 else null end),
                                count(case when predictedLabel='counterstrike-source' then 1 else null end),
                                count(case when predictedLabel='dhcp' then 1 else null end),
                                count(case when predictedLabel='dns' then 1 else null end),
                                count(case when predictedLabel='edonkey' then 1 else null end),
                                count(case when predictedLabel='freenet' then 1 else null end),
                                count(case when predictedLabel='ftp' then 1 else null end),
                                count(case when predictedLabel='gnutella' then 1 else null end),
                                count(case when predictedLabel='h323' then 1 else null end),
                                count(case when predictedLabel='http' then 1 else null end),
                                count(case when predictedLabel='httpaudio' then 1 else null end),
                                count(case when predictedLabel='httpcachehit' then 1 else null end),
                                count(case when predictedLabel='httpcachemiss' then 1 else null end),
                                count(case when predictedLabel='http-itunes' then 1 else null end),
                                count(case when predictedLabel='httpvideo' then 1 else null end),
                                count(case when predictedLabel='ident' then 1 else null end),
                                count(case when predictedLabel='imap' then 1 else null end),
                                count(case when predictedLabel='irc' then 1 else null end),
                                count(case when predictedLabel='jabber' then 1 else null end),
                                count(case when predictedLabel='kugoo' then 1 else null end),
                                count(case when predictedLabel='lpd' then 1 else null end),
                                count(case when predictedLabel='mohaa' then 1 else null end),
                                count(case when predictedLabel='msnmessenger' then 1 else null end),
                                count(case when predictedLabel='nbns' then 1 else null end),
                                count(case when predictedLabel='nntp' then 1 else null end),
                                count(case when predictedLabel='ntp' then 1 else null end),
                                count(case when predictedLabel='pop3' then 1 else null end),
                                count(case when predictedLabel='pressplay' then 1 else null end),
                                count(case when predictedLabel='qq' then 1 else null end),
                                count(case when predictedLabel='quake-halflife' then 1 else null end),
                                count(case when predictedLabel='radmin' then 1 else null end),
                                count(case when predictedLabel='rlogin' then 1 else null end),
                                count(case when predictedLabel='rtp' then 1 else null end),
                                count(case when predictedLabel='rtsp' then 1 else null end),
                                count(case when predictedLabel='shoutcast' then 1 else null end),
                                count(case when predictedLabel='sip' then 1 else null end),
                                count(case when predictedLabel='skypeout' then 1 else null end),
                                count(case when predictedLabel='skypetoskype' then 1 else null end),
                                count(case when predictedLabel='smb' then 1 else null end),
                                count(case when predictedLabel='smtp' then 1 else null end),
                                count(case when predictedLabel='socks' then 1 else null end),
                                count(case when predictedLabel='soulseek' then 1 else null end),
                                count(case when predictedLabel='ssh' then 1 else null end),
                                count(case when predictedLabel='ssl' then 1 else null end),
                                count(case when predictedLabel='stun' then 1 else null end),
                                count(case when predictedLabel='subversion' then 1 else null end),
                                count(case when predictedLabel='teamfortress2' then 1 else null end),
                                count(case when predictedLabel='telnet' then 1 else null end),
                                count(case when predictedLabel='validcertssl' then 1 else null end),
                                count(case when predictedLabel='ventrilo' then 1 else null end),
                                count(case when predictedLabel='vnc' then 1 else null end),
                                count(case when predictedLabel='whois' then 1 else null end),
                                count(case when predictedLabel='worldofwarcraft' then 1 else null end),
                                count(case when predictedLabel='x11' then 1 else null end),
                                count(case when predictedLabel='xboxlive' then 1 else null end),
                                count(case when predictedLabel='yahoo' then 1 else null end),
                                max(received) 
                                from traces where received IN (SELECT max(received) FROM traces)''')
    if data is None:
        return render_template('if.html')
    else:
        for row in data:
            return json.dumps({ 'aim':row[0],
                                'ares':row[1],
                                'armagetron':row[2],
                                'battlefield2':row[3],
                                'battlefield2142':row[4],
                                'bittorrent':row[5],
                                'counterstrike-source':row[6],
                                'dhcp':row[7],
                                'dns':row[8],
                                'edonkey':row[9],
                                'freenet':row[10],
                                'ftp':row[11],
                                'gnutella':row[12],
                                'h323':row[13],
                                'http':row[14],
                                'httpaudio':row[15],
                                'httpcachehit':row[16],
                                'httpcachemiss':row[17],
                                'http-itunes':row[18],
                                'httpvideo':row[19],
                                'ident':row[20],
                                'imap':row[21],
                                'irc':row[22],
                                'jabber':row[23],
                                'kugoo':row[24],
                                'lpd':row[25],
                                'mohaa':row[26],
                                'msnmessenger':row[27],
                                'nbns':row[28],
                                'nntp':row[29],
                                'ntp':row[30],
                                'pop3':row[31],
                                'pressplay':row[32],
                                'qq':row[33],
                                'quake-halflife':row[34],
                                'radmin':row[35],
                                'rlogin':row[36],
                                'rtp':row[37],
                                'rtsp':row[38],
                                'shoutcast':row[39],
                                'sip':row[40],
                                'skypeout':row[41],
                                'skypetoskype':row[42],
                                'smb':row[43],
                                'smtp':row[44],
                                'socks':row[45],
                                'soulseek':row[46],
                                'ssh':row[47],
                                'ssl':row[48],
                                'stun':row[49],
                                'subversion':row[50],
                                'teamfortress2':row[51],
                                'telnet':row[52],
                                'validcertssl':row[53],
                                'ventrilo':row[54],
                                'vnc':row[55],
                                'whois':row[56],
                                'worldofwarcraft':row[57],
                                'x11':row[58],
                                'xboxlive':row[59],
                                'yahoo':row[60],
                                'time':row[61]});


@app.route('/getRealTimeBytes')
def getRealTimeBytes():
    data = query_db('''select   sum(case when predictedLabel='aim' then bytes else 0 end),
                                sum(case when predictedLabel='ares' then bytes else 0 end),
                                sum(case when predictedLabel='armagetron' then bytes else 0 end),
                                sum(case when predictedLabel='battlefield2' then bytes else 0 end),
                                sum(case when predictedLabel='battlefield2bytes42' then bytes else 0 end),
                                sum(case when predictedLabel='bittorrent' then bytes else 0 end),
                                sum(case when predictedLabel='sumerstrike-source' then bytes else 0 end),
                                sum(case when predictedLabel='dhcp' then bytes else 0 end),
                                sum(case when predictedLabel='dns' then bytes else 0 end),
                                sum(case when predictedLabel='edonkey' then bytes else 0 end),
                                sum(case when predictedLabel='freenet' then bytes else 0 end),
                                sum(case when predictedLabel='ftp' then bytes else 0 end),
                                sum(case when predictedLabel='gnutella' then bytes else 0 end),
                                sum(case when predictedLabel='h323' then bytes else 0 end),
                                sum(case when predictedLabel='http' then bytes else 0 end),
                                sum(case when predictedLabel='httpaudio' then bytes else 0 end),
                                sum(case when predictedLabel='httpcachehit' then bytes else 0 end),
                                sum(case when predictedLabel='httpcachemiss' then bytes else 0 end),
                                sum(case when predictedLabel='http-itunes' then bytes else 0 end),
                                sum(case when predictedLabel='httpvideo' then bytes else 0 end),
                                sum(case when predictedLabel='ident' then bytes else 0 end),
                                sum(case when predictedLabel='imap' then bytes else 0 end),
                                sum(case when predictedLabel='irc' then bytes else 0 end),
                                sum(case when predictedLabel='jabber' then bytes else 0 end),
                                sum(case when predictedLabel='kugoo' then bytes else 0 end),
                                sum(case when predictedLabel='lpd' then bytes else 0 end),
                                sum(case when predictedLabel='mohaa' then bytes else 0 end),
                                sum(case when predictedLabel='msnmessenger' then bytes else 0 end),
                                sum(case when predictedLabel='nbns' then bytes else 0 end),
                                sum(case when predictedLabel='nntp' then bytes else 0 end),
                                sum(case when predictedLabel='ntp' then bytes else 0 end),
                                sum(case when predictedLabel='pop3' then bytes else 0 end),
                                sum(case when predictedLabel='pressplay' then bytes else 0 end),
                                sum(case when predictedLabel='qq' then bytes else 0 end),
                                sum(case when predictedLabel='quake-halflife' then bytes else 0 end),
                                sum(case when predictedLabel='radmin' then bytes else 0 end),
                                sum(case when predictedLabel='rlogin' then bytes else 0 end),
                                sum(case when predictedLabel='rtp' then bytes else 0 end),
                                sum(case when predictedLabel='rtsp' then bytes else 0 end),
                                sum(case when predictedLabel='shoutcast' then bytes else 0 end),
                                sum(case when predictedLabel='sip' then bytes else 0 end),
                                sum(case when predictedLabel='skypeout' then bytes else 0 end),
                                sum(case when predictedLabel='skypetoskype' then bytes else 0 end),
                                sum(case when predictedLabel='smb' then bytes else 0 end),
                                sum(case when predictedLabel='smtp' then bytes else 0 end),
                                sum(case when predictedLabel='socks' then bytes else 0 end),
                                sum(case when predictedLabel='soulseek' then bytes else 0 end),
                                sum(case when predictedLabel='ssh' then bytes else 0 end),
                                sum(case when predictedLabel='ssl' then bytes else 0 end),
                                sum(case when predictedLabel='stun' then bytes else 0 end),
                                sum(case when predictedLabel='subversion' then bytes else 0 end),
                                sum(case when predictedLabel='teamfortress2' then bytes else 0 end),
                                sum(case when predictedLabel='telnet' then bytes else 0 end),
                                sum(case when predictedLabel='validcertssl' then bytes else 0 end),
                                sum(case when predictedLabel='ventrilo' then bytes else 0 end),
                                sum(case when predictedLabel='vnc' then bytes else 0 end),
                                sum(case when predictedLabel='whois' then bytes else 0 end),
                                sum(case when predictedLabel='worldofwarcraft' then bytes else 0 end),
                                sum(case when predictedLabel='x11' then bytes else 0 end),
                                sum(case when predictedLabel='xboxlive' then bytes else 0 end),
                                sum(case when predictedLabel='yahoo' then bytes else 0 end),
                                max(received) 
                                from traces where received IN (SELECT max(received) FROM traces)''')
    if data is None:
        return render_template('if.html')
    else:
        for row in data:
            return json.dumps({ 'aim':int(row[0]),
                                'ares':int(row[1]),
                                'armagetron':int(row[2]),
                                'battlefield2':int(row[3]),
                                'battlefield2142':int(row[4]),
                                'bittorrent':int(row[5]),
                                'counterstrike-source':int(row[6]),
                                'dhcp':int(row[7]),
                                'dns':int(row[8]),
                                'edonkey':int(row[9]),
                                'freenet':int(row[10]),
                                'ftp':int(row[11]),
                                'gnutella':int(row[12]),
                                'h323':int(row[13]),
                                'http':int(row[14]),
                                'httpaudio':int(row[15]),
                                'httpcachehit':int(row[16]),
                                'httpcachemiss':int(row[17]),
                                'http-itunes':int(row[18]),
                                'httpvideo':int(row[19]),
                                'ident':int(row[20]),
                                'imap':int(row[21]),
                                'irc':int(row[22]),
                                'jabber':int(row[23]),
                                'kugoo':int(row[24]),
                                'lpd':int(row[25]),
                                'mohaa':int(row[26]),
                                'msnmessenger':int(row[27]),
                                'nbns':int(row[28]),
                                'nntp':int(row[29]),
                                'ntp':int(row[30]),
                                'pop3':int(row[31]),
                                'pressplay':int(row[32]),
                                'qq':int(row[33]),
                                'quake-halflife':int(row[34]),
                                'radmin':int(row[35]),
                                'rlogin':int(row[36]),
                                'rtp':int(row[37]),
                                'rtsp':int(row[38]),
                                'shoutcast':int(row[39]),
                                'sip':int(row[40]),
                                'skypeout':int(row[41]),
                                'skypetoskype':int(row[42]),
                                'smb':int(row[43]),
                                'smtp':int(row[44]),
                                'socks':int(row[45]),
                                'soulseek':int(row[46]),
                                'ssh':int(row[47]),
                                'ssl':int(row[48]),
                                'stun':int(row[49]),
                                'subversion':int(row[50]),
                                'teamfortress2':int(row[51]),
                                'telnet':int(row[52]),
                                'validcertssl':int(row[53]),
                                'ventrilo':int(row[54]),
                                'vnc':int(row[55]),
                                'whois':int(row[56]),
                                'worldofwarcraft':int(row[57]),
                                'x11':int(row[58]),
                                'xboxlive':int(row[59]),
                                'yahoo':int(row[60]),
                                'time':row[61]});

    
@app.route('/getPerformanceMetrics')
def getPerformanceMetrics():
    data = query_db('''select num_traces, time_total, max(received) 
                        from performance_metrics where received IN (SELECT max(received) FROM performance_metrics)''')
    if data is None:
        return render_template('if.html')
    else:
        for row in data:
            return json.dumps({ 'number_traces':row[0],
                                'latency':row[1],
                                'time':row[2]});

@app.route('/home')
def home():
    error = None

    if not session.get('logged_in'):
        abort(401)
    return render_template('test.html', error=error)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('home'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('home'))

@app.route('/historicalGraphs')
def historicalGraphs():
    return render_template('historical_data.html')

@app.route('/realtimeGraphs')
def realtimeGraphs():
    return render_template('real_time_data.html')

#@app.route('/performanceGraphs')
#def performanceGraphs():
#    return render_template('performance_data.html')

@app.route('/test')
def test():
    return render_template('historical_data.html')