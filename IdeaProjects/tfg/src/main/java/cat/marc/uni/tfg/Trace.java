package cat.marc.uni.tfg;

import java.io.Serializable;

public class Trace implements Serializable {
    private static final long serialVersionUID = 1L;

    private int protocolaaa;
    private int src_port;
    private int dest_port;
    private int packets;
    private int bytes;
    private double start_time;
    private double end_time;
    private double duration;
    private int bytesXpakts;
    private int toS;
    private int urg;
    private int ack;
    private int psh;
    private int rst;
    private int syn;
    private int fin;
    private String applications;

    public void setProtocol(int protocol) {
        this.protocolaaa = protocol;
    }

    public void setSrc_port(int src_port) {
        this.src_port = src_port;
    }

    public void setDest_port(int dest_port) {
        this.dest_port = dest_port;
    }

    public void setPackets(int packets) {
        this.packets = packets;
    }

    public void setBytes(int bytes) {
        this.bytes = bytes;
    }

    public void setStart_time(double start_time) {
        this.start_time = start_time;
    }

    public void setEnd_time(double end_time) {
        this.end_time = end_time;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public void setBytesXpakts(int bytesXpakts) {
        this.bytesXpakts = bytesXpakts;
    }

    public void setToS(int toS) {
        this.toS = toS;
    }

    public void setUrg(int urg) {
        this.urg = urg;
    }

    public void setAck(int ack) {
        this.ack = ack;
    }

    public void setPsh(int psh) {
        this.psh = psh;
    }

    public void setRst(int rst) {
        this.rst = rst;
    }

    public void setSyn(int syn) {
        this.syn = syn;
    }

    public void setFin(int fin) {
        this.fin = fin;
    }

    public void setApplications(String applications) {
        this.applications = applications;
    }

    public int getProtocol() {
        return protocolaaa;
    }

    public int getSrc_port() {
        return src_port;
    }

    public int getDest_port() {
        return dest_port;
    }

    public int getPackets() {
        return packets;
    }

    public int getBytes() {
        return bytes;
    }

    public double getStart_time() {
        return start_time;
    }

    public double getEnd_time() {
        return end_time;
    }

    public double getDuration() {
        return duration;
    }

    public int getBytesXpakts() {
        return bytesXpakts;
    }

    public int getToS() {
        return toS;
    }

    public int getUrg() {
        return urg;
    }

    public int getAck() {
        return ack;
    }

    public int getPsh() {
        return psh;
    }

    public int getRst() {
        return rst;
    }

    public int getSyn() {
        return syn;
    }

    public int getFin() {
        return fin;
    }

    public String getApplications() {
        return applications;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}