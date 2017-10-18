package cat.marc.uni.tfg;

        import org.apache.spark.ml.Transformer;
        import org.apache.spark.ml.param.ParamMap;
        import org.apache.spark.sql.Dataset;
        import org.apache.spark.sql.SQLContext;
        import org.apache.spark.sql.api.java.UDF1;
        import org.apache.spark.sql.functions;
        import org.apache.spark.sql.types.DataTypes;
        import org.apache.spark.sql.types.StructType;

/**
 * Created by marc on 28/08/17.
 */
public class IATtransformer extends Transformer {
    private SQLContext sqc;
    private static final long serialVersionUID = 5545470640951989469L;
    String init_time_col;
    String end_time_col;
    String duration_col;

    IATtransformer(SQLContext sqc) {
        this.sqc = sqc;
        this.init_time_col = init_time_col;
        this.end_time_col = end_time_col;
        this.duration_col = duration_col;
    }

    @Override
    public String uid() {
        return "IATtransformer" + serialVersionUID;
    }

    @Override
    public Transformer copy(ParamMap arg0) {
        return null;
    }

    @Override
    public Dataset transform(Dataset data) {

        sqc.udf().register("calculateIAT", new UDF1< Double, Double >() {

            @Override
            public Double call(Double degreesCelcius) {

                return ((degreesCelcius * 9.0 / 5.0) + 32.0);

            }
        }, DataTypes.DoubleType);
        return data.withColumn("iat", functions.callUDF("calculateIAT"));
    }

    @Override
    public StructType transformSchema(StructType arg0) {
        return arg0;
    }
}