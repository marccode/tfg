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

public final class TraceReceiver {
    private static final Pattern COMA = Pattern.compile(",");

    private static ArrayList<Trace> traces_array = new ArrayList<Trace>();

    private static SQLContext sqc;
    private static JavaStreamingContext ssc;

    private static TreeClassifier tc;

    private static DBManager dbm;

    private static long timeA;
    private static long timeB;
    private static long timeC;
    private static long timeD;

    public static void main(String[] args) throws Exception {


        if (args.length < 1) {
            System.err.println("Usage: appname <brokerlist:XXXX>");
            System.exit(1);
        }


        //SparkSession spark = SparkSession
        //        .builder()
        //        .appName("FlowInspector")
        //        .getOrCreate();


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
                    System.out.println("\n\nFOREACH-STRING COMMING!!!\n\n");

                    List<String> a = Arrays.asList(COMA.split(s));
                    // ATENCIÓ LA LINIA DE SOTA LA HE COMENTAT PER INTENTAR SOLUCIONAR EL PROBLEMA
                    // DEL GARBAGE COLLECTOR, PERÒ NO HE PROBAT SI FUNCIONA.
                    // HE MOGUT LA LINIA DE SOTA MÉS A DALT, PER NO CREAR UN NOU OBJECTE PER CADA
                    // TRACE QUE REBO.
                    //Trace t = new Trace();

                    t.setProtocol(Integer.parseInt(a.get(0)));
                    t.setSrc_port(Integer.parseInt(a.get(1)));
                    t.setDest_port(Integer.parseInt(a.get(2)));
                    t.setPackets(Integer.parseInt(a.get(3)));
                    t.setBytes(Integer.parseInt(a.get(4)));
                    t.setStart_time(Double.parseDouble(a.get(5)));
                    t.setEnd_time(Double.parseDouble(a.get(6)));
                    t.setDuration(Double.parseDouble(a.get(7)));
                    t.setBytesXpakts(Integer.parseInt(a.get(8)));
                    t.setToS(Integer.parseInt(a.get(9)));
                    t.setUrg(Integer.parseInt(a.get(10)));
                    t.setAck(Integer.parseInt(a.get(11)));
                    t.setPsh(Integer.parseInt(a.get(12)));
                    t.setRst(Integer.parseInt(a.get(13)));
                    t.setSyn(Integer.parseInt(a.get(14)));
                    t.setFin(Integer.parseInt(a.get(15)));
                    t.setApplications(a.get(16));

                    addTrace(t);

                });

                Dataset ds = createDF();
                Dataset<Row> d = tc.predict_realtime(ds);

                // CALCULA Quan s'han processat aquests flows:
                java.util.Date dt = new java.util.Date();
                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
                String currentTime = sdf.format(dt);

                // Guarda a la BD tots els flows:
                d.foreach((ForeachFunction<Row>) row ->
                                dbm.insertTrace( row.getInt(9), // protocol
                                        row.getInt(12), // src_port
                                        row.getInt(4), // dest_port
                                        row.getInt(8), // packets
                                        row.getInt(2), // bytes
                                        row.getDouble(13), // start_time
                                        row.getDouble(6), // end_time
                                        row.getDouble(5), // duration
                                        row.getInt(3), // bytes_pkts
                                        row.getInt(15), // tos
                                        row.getInt(16), // urg
                                        row.getInt(0), // ack
                                        row.getInt(10), // psh
                                        row.getInt(11), // rstta
                                        row.getInt(14), // syn
                                        row.getInt(7), // fin
                                        row.getString(1), // application
                                        Double.toString(row.getDouble(21)), // prediction
                                        currentTime,
                                        row.getString(22)) // predictedLabel
                                        //System.out.print(row.schema())
                );
            }

        });

        ssc.start();
        ssc.awaitTermination();
    }

    private static void clearArray() {
        //System.out.println("Clearing Array...");
        traces_array = new ArrayList<Trace>();
    }

    private static void addTrace(Trace t) {
        //System.out.println("Adding new trace...");
        traces_array.add(t);
        //System.out.println("Size of Array is: " + traces_array.size());
    }

    private static Dataset createDF() {
        //System.out.println("Creating DataFrame with Array of size: " + traces_array.size());
        Dataset ds = sqc.createDataFrame(traces_array, Trace.class);
        return ds;
    }
}