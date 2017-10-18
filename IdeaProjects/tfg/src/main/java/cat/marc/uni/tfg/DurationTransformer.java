package cat.marc.uni.tfg;

import org.apache.spark.ml.Transformer;
import org.apache.spark.ml.param.ParamMap;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.functions;
import org.apache.spark.sql.types.StructType;

/**
 * Created by marc on 24/08/17.
 */
public class DurationTransformer extends Transformer {
    private static final long serialVersionUID = 5545470640951989469L;
    String init_time_col;
    String end_time_col;
    String duration_col;

    DurationTransformer(String init_time_col, String end_time_col, String duration_col) {
        this.init_time_col = init_time_col;
        this.end_time_col = end_time_col;
        this.duration_col = duration_col;
    }

    @Override
    public String uid() {
        return "CustomTransformer" + serialVersionUID;
    }

    @Override
    public Transformer copy(ParamMap arg0) {
        return null;
    }

    @Override
    public Dataset transform(Dataset data) {
        return data.withColumn("power", functions.pow(data.col("bytes"), 0)); //this.init_time_col
    }

    @Override
    public StructType transformSchema(StructType arg0) {
        return arg0;
    }
}