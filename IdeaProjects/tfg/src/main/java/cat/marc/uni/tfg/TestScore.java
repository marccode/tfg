package cat.marc.uni.tfg;

import org.apache.spark.mllib.linalg.Matrix;

/**
 * Created by marc on 26/08/17.
 */
public class TestScore {
    public String test_name;
    public double f1;
    public double accuracy;
    public double weighted_precision;
    public double weighted_recall;
    public Matrix confusion_matrix;
}
