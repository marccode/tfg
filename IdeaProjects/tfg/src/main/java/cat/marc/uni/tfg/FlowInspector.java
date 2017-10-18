/*
package cat.marc.uni.tfg;

import cat.marc.uni.tfg.TreeClassifier;
import org.apache.spark.sql.SparkSession;

public class FlowInspector {

    public static void main(String[] args) throws Exception {

        SparkSession spark = SparkSession
                .builder()
                .appName("TreeClassifier")
                .getOrCreate();

        TreeClassifier tc = new TreeClassifier(spark);

        // PRIMER COP ENTRENA I GUARDA:
        tc.train("/home/marc/Spark/spark-2.1.1-bin-hadoop2.7/data/mllib/sample_libsvm_data.txt");
        tc.save("/home/marc/Documents/uni/fin/tfg/test/model/");


        // ALTRES COPS CARREGA DE DISC:
        tc.load("/home/marc/Documents/uni/fin/tfg/test/model/");

    }
}
*/