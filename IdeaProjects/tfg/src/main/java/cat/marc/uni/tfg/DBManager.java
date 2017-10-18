package cat.marc.uni.tfg;

import org.mariadb.jdbc.Driver;
import org.mariadb.jdbc.MariaDbConnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;


/**
 * Created by marc on 06/09/17.
 */
public class DBManager {

    private Connection connect() {
        // SQLite connection string
        //String url = "jdbc:sqlite:/home/marc/Documents/uni/tfg/sqlite/db/test.db";
        //String url = "jdbc:mysql:/home/marc/Documents/uni/tfg/sqlite/db/test.db";
        String url = "jdbc:mariadb://localhost:3306/flowinspector";
        String username = "NOPE";               // Change
        String password = "NOPE";               // Change
        Properties p = new Properties();
        p.put("user", username);
        p.put("password", password);


        try {
            Class.forName("org.mariadb.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("\n\nWhere is the MariaDB JDBC Driver?\n\n\n");
            e.printStackTrace();
        }

        try {
            DriverManager.getDriver(url);
        } catch(SQLException e) {
            System.out.println(e.getMessage());
        }

        Driver d = new Driver();
        Connection conn = null;
        //MariaDbConnection conn = null;
        try {
            //conn = DriverManager.getConnection(url, username, password);
            conn = d.connect(url, p);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }

    /**
     * Insert a new row into the warehouses table
     *
     */
    public void insertTrace (int protocol, int src_port, int dest_port, int packets, int bytes, double start_time, double end_time, double duration, int bytes_pkts, int tos, int urg, int ack, int psh, int rst, int syn, int fin, String application, String prediction, String currentTime, String predictedLabel) {
        String sql = "INSERT INTO traces(protocol,src_port,dest_port,packets,bytes,start_time,end_time,duration,bytes_pkts,tos,urg,ack,psh,rst,syn,fin,application,prediction,received,predictedLabel) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        try (Connection conn = this.connect(); // TANCAR CONNEXIo!
            PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, protocol);
            pstmt.setInt(2, src_port);
            pstmt.setInt(3, dest_port);
            pstmt.setInt(4, packets);
            pstmt.setInt(5, bytes);
            pstmt.setDouble(6, start_time);
            pstmt.setDouble(7, end_time);
            pstmt.setDouble(8, duration);
            pstmt.setInt(9, bytes_pkts);
            pstmt.setInt(10, tos);
            pstmt.setInt(11, urg);
            pstmt.setInt(12, ack);
            pstmt.setInt(13, psh);
            pstmt.setInt(14, rst);
            pstmt.setInt(15, syn);
            pstmt.setInt(16, fin);
            pstmt.setString(17, application);
            pstmt.setString(18, prediction);
            pstmt.setString(19, currentTime);
            pstmt.setString(20, predictedLabel);
            pstmt.executeUpdate();
            conn.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void insertBatchPerformance (int num_traces, long time_total, String currentTime) {
        String sql = "INSERT INTO performance_metrics(num_traces, time_total, received) VALUES(?,?,?)";

        try (Connection conn = this.connect(); // TANCAR CONNEXIo!
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            System.out.println("\n\nSAVING BATCH?\n\n\n");

            pstmt.setInt(1, num_traces);
            pstmt.setLong(2, time_total);
            pstmt.setString(3, currentTime);
            pstmt.executeUpdate();
            conn.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
