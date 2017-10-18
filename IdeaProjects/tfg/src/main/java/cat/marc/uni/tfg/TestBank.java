package cat.marc.uni.tfg;

import org.apache.spark.ml.Pipeline;
import org.apache.spark.ml.PipelineModel;
import org.apache.spark.ml.PipelineStage;
import org.apache.spark.ml.classification.*;
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator;
import org.apache.spark.ml.feature.*;
import org.apache.spark.ml.util.MetadataUtils;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
import scala.Tuple2;
import scala.tools.nsc.backend.icode.Primitives;

import org.apache.spark.mllib.evaluation.MulticlassMetrics;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created by marc on 26/08/17.
 */
public class TestBank {

    private SQLContext ss;

    // Tests and Scores
    private ArrayList<String> tests;
    private ArrayList<TestScore> scores;

    // Pipelines
    private StringIndexerModel indexer_training_model;
    private StringIndexer indexer_training;
    private Pipeline pipeline;
    private VectorAssembler assembler;
    private VectorIndexer vector_indexer;
    private VectorIndexerModel vector_indexer_model;

    // Datasets
    private String datasetPath;
    private Dataset training_dataset;
    private Dataset testing_dataset;

    public TestBank(SQLContext ss, ArrayList<String> test_names, String datasetPath) {
        this.ss = ss;
        this.tests = test_names;
        this.datasetPath = datasetPath;
        this.scores = new ArrayList<TestScore>();

        // DATASETS
        List<StructField> fields = Arrays.asList(
                DataTypes.createStructField("protocol", DataTypes.IntegerType, true),
                DataTypes.createStructField("src_port", DataTypes.IntegerType, true),
                DataTypes.createStructField("dest_port", DataTypes.IntegerType, true),
                DataTypes.createStructField("packets", DataTypes.IntegerType, true),
                DataTypes.createStructField("bytes", DataTypes.IntegerType, true),
                DataTypes.createStructField("start_time", DataTypes.DoubleType, true),
                DataTypes.createStructField("end_time", DataTypes.DoubleType, true),
                DataTypes.createStructField("duration", DataTypes.DoubleType, true),
                DataTypes.createStructField("bytesXpakts", DataTypes.IntegerType, true),
                DataTypes.createStructField("toS", DataTypes.IntegerType, true),
                DataTypes.createStructField("urg", DataTypes.IntegerType, true),
                DataTypes.createStructField("ack", DataTypes.IntegerType, true),
                DataTypes.createStructField("psh", DataTypes.IntegerType, true),
                DataTypes.createStructField("rst", DataTypes.IntegerType, true),
                DataTypes.createStructField("syn", DataTypes.IntegerType, true),
                DataTypes.createStructField("fin", DataTypes.IntegerType, true),
                DataTypes.createStructField("applications", DataTypes.StringType, true));

        StructType schema = DataTypes.createStructType(fields);

        Dataset<Row> data = ss
                .read()
                .format("com.databricks.spark.csv")
                .schema(schema)
                .option("header", "false")
                .load(datasetPath);

        Dataset<Row>[] splits = data.randomSplit(new double[]{0.7, 0.3});
        training_dataset = splits[0];
        testing_dataset = splits[1];

        // PIPELINE PREPARATION
        //indexer_training_model = new StringIndexer()
        indexer_training = new StringIndexer()
            .setInputCol("applications")
            .setOutputCol("label");
            //.fit(training_dataset);

        //vector_indexer_model = new VectorIndexer()
        vector_indexer = new VectorIndexer()
            .setInputCol("features_prev")
            .setOutputCol("features")
            .setMaxCategories(2);


        // PREPROCESSING
        //DurationTransformer myTransformer = new DurationTransformer("start_time","end_time","duration");

        String[] inputCols = {"protocol", "src_port", "dest_port", "packets", "bytes", "duration", "bytesXpakts", "toS", "urg", "ack", "psh", "rst", "syn", "fin"};
        assembler = new VectorAssembler();
        assembler.setInputCols(inputCols);
        assembler.setOutputCol("features_prev");
    }

    private PipelineModel train(Pipeline pipeline) {
        return pipeline.fit(training_dataset);
    }

    private Dataset<Row> test(PipelineModel model) {
        return model.transform(testing_dataset);
    }

    private void setScores(Dataset<Row> predictions, String name) {
        TestScore ts = new TestScore();
        ts.test_name = name;

        MulticlassMetrics metrics = new MulticlassMetrics(predictions.select("prediction", "label"));

        MulticlassClassificationEvaluator evaluator = new MulticlassClassificationEvaluator()
            .setLabelCol("label")
            .setPredictionCol("prediction");

        evaluator.setMetricName("accuracy");
        double accuracy = evaluator.evaluate(predictions);
        ts.accuracy = accuracy;

        evaluator.setMetricName("weightedPrecision");
        ts.weighted_precision = evaluator.evaluate(predictions);
        evaluator.setMetricName("weightedRecall");
        ts.weighted_recall = evaluator.evaluate(predictions);
        evaluator.setMetricName("f1");
        ts.f1 = evaluator.evaluate(predictions);

        ts.confusion_matrix = metrics.confusionMatrix();

        scores.add(ts);
    }

    private void getScores() {
        System.out.println("\n\n*********** TEST RESULTS ***********\n");
        int size = tests.size();
        for (int i = 0; i < size; i++) {
            TestScore ts = scores.get(i);
            System.out.println(ts.test_name);
            System.out.println("\tAccuracy: " + ts.accuracy);
            System.out.println("\tF1 : " + ts.f1);
            System.out.println("\tWeighted Precission: " + ts.weighted_precision);
            System.out.println("\tWeighted Recall: " + ts.weighted_recall);
            System.out.println("\n");
            System.out.println("Confusion Matrix:");
            System.out.println(ts.confusion_matrix.toString());
            System.out.println("\n");
        }
    }

    public void run() {
        int size = tests.size();
        for (int i = 0; i < size; ++i) {
            PipelineModel model;
            Dataset<Row> predictions;

            switch (tests.get(i)) {

                case "MultinomialLogisticRegression":

                    LogisticRegression lr = new LogisticRegression()
                        .setLabelCol("label")
                        .setFeaturesCol("features")
                        .setMaxIter(10)
                        .setRegParam(0.3)
                        .setElasticNetParam(0.8);

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, lr});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Multinomial Logistic Regression");

                    break;

                case "DecisionTree":

                    DecisionTreeClassifier dt = new DecisionTreeClassifier()
                        .setLabelCol("label")
                        .setFeaturesCol("features");

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, vector_indexer, dt});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Decisions Tree");


                    //vector_indexer_model = (VectorIndexerModel) (model.stages()[2]);
                    //Map<Integer, Map<Double, Integer>> categoryMaps = vector_indexer_model.javaCategoryMaps();
                    //MetadataUtils.getCategoricalFeatures(training_dataset.schema()("features"));
                    //
                    //Map<Object, Object> categoryMaps = MetadataUtils.getCategoricalFeatures(training_dataset.select("features").schema());

                    /*
                    System.out.println("\n\n********** ALERT *********");
                    System.out.println("Chose " + categoryMaps.size() + " categorical features:");
                    for (Object feature : categoryMaps.keySet()) {
                        System.out.print(" " + feature);
                    }
                    System.out.println("\n\n");
                    training_dataset.printSchema();
                    */


                    System.out.println("\n");
                    //StringIndexerModel stringIndexerModelAux = (StringIndexerModel) (model.stages()[0]);
                    //System.out.println("\n\n" + "******* AASDASDASDASDASDASDASDADAS *********");
                    //System.out.println("NUMERO DE CLASSES: " + stringIndexerModelAux.labels().length + "\n\n");
                    break;

                case "RandomForest":

                    RandomForestClassifier rf = new RandomForestClassifier()
                        .setLabelCol("label")
                        .setFeaturesCol("features");

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, rf});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Random Forest");

                    break;


                // ACTUALMENT NOMÉS SUPORTA CLASSIFICACIÓ BINARIA
                /*
                case "Gradient-boostedTree":

                    GBTClassifier gbt = new GBTClassifier()
                        .setLabelCol("label")
                        .setFeaturesCol("features")
                        .setMaxIter(10);

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, gbt});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Gradient-boosted Tree");

                    break;
                */

                case "MultilayerPerceptron":


                    // CALDRÀ COMPROVAR EL NUMERO FINAL DE FEATURES I DE CLASSES!!!

                    // specify layers for the neural network:
                    // input layer of size 4 (features), two intermediate of size 5 and 4
                    // and output of size 48 (classes)
                    int[] layers = new int[] {14, 5, 4, 48};

                    // create the trainer and set its parameters
                    MultilayerPerceptronClassifier trainer = new MultilayerPerceptronClassifier()
                        .setLabelCol("label")
                        .setFeaturesCol("features")
                        .setLayers(layers)
                        .setBlockSize(128)
                        .setSeed(1234L)
                        .setMaxIter(100);

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, trainer});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Multilayer Perceptron");

                    break;

                // NO DISPONIBLE A LA VERSIO 2.1.1
                /*
                case "LinearSuportVectorMachine":

                    LinearSVC lsvc = new LinearSVC()
                        .setLabelCol("label")
                        .setFeaturesCol("features")
                        .setMaxIter(10)
                        .setRegParam(0.1);

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, lsvc});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Linear Suport Vector Machine");

                    break;
                */

                case "One-vs-Rest":

                    // configure the base classifier.
                    LogisticRegression classifier = new LogisticRegression()
                        .setLabelCol("label")
                        .setFeaturesCol("features")
                        .setMaxIter(10)
                        .setTol(1E-6)
                        .setFitIntercept(true);

// instantiate the One Vs Rest Classifier.
                    OneVsRest ovr = new OneVsRest().setClassifier(classifier);

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, ovr});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "One-vs-Rest");

                    break;

                case "NaiveBayes":

                    NaiveBayes nb = new NaiveBayes()
                        .setLabelCol("label")
                        .setFeaturesCol("features");

                    pipeline = new Pipeline().setStages(new PipelineStage[]{indexer_training, assembler, nb});
                    model =  train(pipeline);
                    predictions = test(model);
                    setScores(predictions, "Naive Bayes");
                    break;

            }
        }

        getScores();
    }
}
