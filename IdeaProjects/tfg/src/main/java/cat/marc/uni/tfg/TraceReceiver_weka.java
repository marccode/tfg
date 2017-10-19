package cat.marc.uni.tfg;

import java.util.*;
import java.util.regex.Pattern;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.ForeachFunction;
import org.apache.spark.sql.*;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.StorageLevels;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import  org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import weka.classifiers.Classifier;
import weka.core.*;
import weka.classifiers.trees.J48;

public final class TraceReceiver_weka {
    private static final Pattern COMA = Pattern.compile(",");

    private static ArrayList<Trace> traces_array = new ArrayList<Trace>();

    private static SQLContext sqc;
    private static JavaStreamingContext ssc;

    private static TreeClassifier tc;

    private static DBManager dbm;

    private static ArrayList attributes;
    private static ArrayList classVal;
    private static Instances dataRaw;

    private static Attribute protocol;
    private static Attribute src_port;
    private static Attribute dest_port;
    private static Attribute packets;
    private static Attribute bytes;
    private static Attribute start_time;
    private static Attribute end_time;
    private static Attribute duration;
    private static Attribute bytes_pkts;
    private static Attribute tos;
    private static Attribute urg;
    private static Attribute ack;
    private static Attribute psh;
    private static Attribute rst;
    private static Attribute syn;
    private static Attribute fin;

    private static Classifier cls;



    public static void main(String[] args) throws Exception {


        if (args.length < 1) {
            System.err.println("Usage: appname <brokerlist:XXXX>");
            System.exit(1);
        }

        System.out.println(args[0]);

        // Create the context with a 5 second batch size
        SparkConf sparkConf = new SparkConf().setAppName("FlowInspector");
        ssc = new JavaStreamingContext(sparkConf, Durations.seconds(5));

        //SQLContext sqc = new SQLContext(SparkSession.builder().getOrCreate());
        sqc = new SQLContext(SparkSession.builder().getOrCreate());

        tc = new TreeClassifier(sqc);

        dbm = new DBManager();

        // PORTATIL:
        //tc.load("/home/marc/Documents/uni/fib/tfg/test/model/");
        //tc.train("/home/marc/Documents/uni/drive/UPCII_mod.log");
        //tc.save("/home/marc/Documents/uni/fib/tfg/test/model/");
        //tc.predict("/home/marc/Documents/uni/drive/UPCII_mod.log");

        // PC:
        //tc.train(args[1]);//"/home/marc/Documents/uni/tfg/traces/UPCII_mod.log");
        //tc.predict("/home/marc/Documents/uni/tfg/traces/UPCI_mod.log");
        //tc.save("/home/marc/Documents/uni/tfg/tests/model/");

        //AWS:
        //tc.load("https://s3.eu-west-2.amazonaws.com/datasets-tfg-marc/model/"); NO WORK AIXI
        //tc.train("/home/marc/Documents/uni/fib/tfg/traces/new_dataset.csv");
        //tc.predict("/home/marc/Documents/uni/fib/tfg/dataset_for_testing_spark_model.csv");

        //JavaReceiverInputDStream<String> lines = ssc.socketTextStream(
        //        "ec2-35-176-49-16.eu-west-2.compute.amazonaws.com", 31337, StorageLevels.MEMORY_AND_DISK_SER);    // SOCKETS


        String path ="/home/marc/Documents/uni/fib/tfg/weka-decisiontree.model";
        cls = null;
        try {
            cls = (J48) SerializationHelper.read(path);
        } catch (Exception ex) {
            //Logger.getLogger(ModelClassifier.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("\n\n\tERROR LOADING WEKA MODEL\n");
        }


        protocol = new Attribute("protocol");
        src_port = new Attribute("src_port");
        dest_port = new Attribute("dest_port");
        packets = new Attribute("packets");
        bytes = new Attribute("bytes");
        start_time = new Attribute("start_time");
        end_time = new Attribute("end_time");
        duration = new Attribute("duration");
        bytes_pkts = new Attribute("bytes_pkts");
        tos = new Attribute("tos");
        urg = new Attribute("urg");
        ack = new Attribute("ack");
        psh = new Attribute("psh");
        rst = new Attribute("rst");
        syn = new Attribute("syn");
        fin = new Attribute("fin");

        attributes = new ArrayList();
        classVal = new ArrayList();

        classVal.add("radmin");
        classVal.add("msnmessenger");
        classVal.add("httpcachemiss");
        classVal.add("smtp:");
        classVal.add("battlefield2142");
        classVal.add("edonkey");
        classVal.add("armagetron");
        classVal.add("shoutcast");
        classVal.add("soulseek");
        classVal.add("mohaa");
        classVal.add("vnc");
        classVal.add("validcertssl");
        classVal.add("quake-halflife");
        classVal.add("jabber");
        classVal.add("battlefield2");
        classVal.add("ftp");
        classVal.add("socks");
        classVal.add("sip");
        classVal.add("whois");
        classVal.add("bittorrent");
        classVal.add("kugoo");
        classVal.add("xboxlive");
        classVal.add("worldofwarcraft:");
        classVal.add("ares");
        classVal.add("dns");
        classVal.add("httpaudio");
        classVal.add("httpcachehit");
        classVal.add("dhcp");
        classVal.add("stun");
        classVal.add("smb");
        classVal.add("nbns");
        classVal.add("rtsp");
        classVal.add("http");
        classVal.add("ventrilo");
        classVal.add("skypeout");
        classVal.add("ntp");
        classVal.add("yahoo");
        classVal.add("telnet");
        classVal.add("pop3");
        classVal.add("ssl");
        classVal.add("ssh");
        classVal.add("pressplay");
        classVal.add("httpvideo");
        classVal.add("skypetoskype");
        classVal.add("imap");
        classVal.add("qq");
        classVal.add("ident");
        classVal.add("rlogin");
        classVal.add("http-itunes");
        classVal.add("freenet");
        classVal.add("gnutella");
        classVal.add("aim");
        classVal.add("x11:");
        classVal.add("lpd");
        classVal.add("rtp");

        attributes.add(protocol);
        attributes.add(src_port);
        attributes.add(dest_port);
        attributes.add(packets);
        attributes.add(bytes);
        attributes.add(start_time);
        attributes.add(end_time);
        attributes.add(duration);
        attributes.add(bytes_pkts);
        attributes.add(tos);
        attributes.add(urg);
        attributes.add(ack);
        attributes.add(psh);
        attributes.add(rst);
        attributes.add(syn);
        attributes.add(fin);

        attributes.add(new Attribute("class", classVal));
        dataRaw = new Instances("TestInstances", attributes, 0);
        dataRaw.setClassIndex(dataRaw.numAttributes() - 1);


        // KAFKA!!!!
        Map<String, Object> kafkaParams = new HashMap<>();
        kafkaParams.put("bootstrap.servers", args[0]);//"10.10.1.2:9092");
        kafkaParams.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaParams.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        kafkaParams.put("group.id", "use_a_separate_group_id_for_each_stream");
        kafkaParams.put("auto.offset.reset", "latest");
        kafkaParams.put("enable.auto.commit", false);

        Collection<String> topics = Arrays.asList("flowinspector");

        final JavaInputDStream<ConsumerRecord<String, String>> lines =
                KafkaUtils.createDirectStream(
                        ssc,
                        LocationStrategies.PreferConsistent(),
                        ConsumerStrategies.<String, String>Subscribe(topics, kafkaParams)
                );


        lines.foreachRDD((JavaRDD<ConsumerRecord<String, String>> rdd) -> {
        //lines.foreachRDD((JavaRDD<String> rdd) -> {                                               // SOCKETS

            if (!rdd.isEmpty()) {

                clearArray();

                Trace t = new Trace();
                //rdd.foreach((String s) -> {                                                       // SOCKETS
                rdd.foreach((ConsumerRecord<String, String> cr) -> {
                    String s = cr.value();
                    classifyInstance(s);

                });
            }

        });

        ssc.start();
        ssc.awaitTermination();
    }


    private static void saveInstacene2BD(int protocol, int src_port, int dest_port, int packets, int bytes, double start_time, double end_time, double duration, int bytes_pkts, int tos, int urg, int ack, int psh, int rst, int syn, int fin, String result, String currentTime) {

        dbm.insertTrace(protocol, src_port, dest_port, packets, bytes, start_time, end_time, duration, bytes_pkts, tos, urg, ack, psh, rst, syn, fin, "unknown", "null", currentTime, result);
    }

    private static void classifyInstance(String instance) {
        List<String> instance_fields = Arrays.asList(COMA.split(instance));

        dataRaw.clear();
        double[] instanceValue1 = new double[]{Integer.parseInt(instance_fields.get(0)), Integer.parseInt(instance_fields.get(1)), Integer.parseInt(instance_fields.get(2)), Integer.parseInt(instance_fields.get(3)), Integer.parseInt(instance_fields.get(4)), Double.parseDouble(instance_fields.get(5)), Double.parseDouble(instance_fields.get(6)), Double.parseDouble(instance_fields.get(7)), Integer.parseInt(instance_fields.get(8)), Integer.parseInt(instance_fields.get(9)), Integer.parseInt(instance_fields.get(10)), Integer.parseInt(instance_fields.get(11)), Integer.parseInt(instance_fields.get(12)), Integer.parseInt(instance_fields.get(13)), Integer.parseInt(instance_fields.get(14)), Integer.parseInt(instance_fields.get(15)), 0};
        dataRaw.add(new DenseInstance(1.0, instanceValue1));

        String result = null;
        try {
            result = Objects.toString(classVal.get((int)cls.classifyInstance(dataRaw.firstInstance())), null);
        } catch (Exception ex) {
            //Logger.getLogger(ModelClassifier.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("\n\n\tERROR LOADING WEKA MODEL\n");
        }

        // CALCULA Quan s'han processat aquests flows:
        java.util.Date dt = new java.util.Date();
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String currentTime = sdf.format(dt);
        saveInstacene2BD(Integer.parseInt(instance_fields.get(0)), Integer.parseInt(instance_fields.get(1)), Integer.parseInt(instance_fields.get(2)), Integer.parseInt(instance_fields.get(3)), Integer.parseInt(instance_fields.get(4)), Double.parseDouble(instance_fields.get(5)), Double.parseDouble(instance_fields.get(6)), Double.parseDouble(instance_fields.get(7)), Integer.parseInt(instance_fields.get(8)), Integer.parseInt(instance_fields.get(9)), Integer.parseInt(instance_fields.get(10)), Integer.parseInt(instance_fields.get(11)), Integer.parseInt(instance_fields.get(12)), Integer.parseInt(instance_fields.get(13)), Integer.parseInt(instance_fields.get(14)), Integer.parseInt(instance_fields.get(15)), result, currentTime);
    }

    private static void clearArray() {
        //System.out.println("Clearing Array...");
        traces_array = new ArrayList<Trace>();
    }
}