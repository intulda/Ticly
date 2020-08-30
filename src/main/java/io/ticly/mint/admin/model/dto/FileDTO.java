package io.ticly.mint.admin.model.dto;

import oracle.sql.BLOB;

public class FileDTO {

    private int file_seq;
    private String file_key;
    private String file_type;
    private String file_name;
    private String file_origin_name;
    private BLOB file_contents;
    private String file_ext;
    private String file_size;
    private String reg_date;
    private String reg_email;
    private String udt_date;
    private String udt_email;

    public FileDTO() {

    }

    public FileDTO(int file_seq, String file_key, String file_type, String file_name, String file_origin_name, BLOB file_contents, String file_ext, String file_size, String reg_date, String reg_email, String udt_date, String udt_email) {
        this.file_seq = file_seq;
        this.file_key = file_key;
        this.file_type = file_type;
        this.file_name = file_name;
        this.file_origin_name = file_origin_name;
        this.file_contents = file_contents;
        this.file_ext = file_ext;
        this.file_size = file_size;
        this.reg_date = reg_date;
        this.reg_email = reg_email;
        this.udt_date = udt_date;
        this.udt_email = udt_email;
    }


    public int getFile_seq() {
        return file_seq;
    }

    public void setFile_seq(int file_seq) {
        this.file_seq = file_seq;
    }

    public String getFile_key() {
        return file_key;
    }

    public void setFile_key(String file_key) {
        this.file_key = file_key;
    }

    public String getFile_type() {
        return file_type;
    }

    public void setFile_type(String file_type) {
        this.file_type = file_type;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getFile_origin_name() {
        return file_origin_name;
    }

    public void setFile_origin_name(String file_origin_name) {
        this.file_origin_name = file_origin_name;
    }

    public BLOB getFile_contents() {
        return file_contents;
    }

    public void setFile_contents(BLOB file_contents) {
        this.file_contents = file_contents;
    }

    public String getFile_ext() {
        return file_ext;
    }

    public void setFile_ext(String file_ext) {
        this.file_ext = file_ext;
    }

    public String getFile_size() {
        return file_size;
    }

    public void setFile_size(String file_size) {
        this.file_size = file_size;
    }

    public String getReg_date() {
        return reg_date;
    }

    public void setReg_date(String reg_date) {
        this.reg_date = reg_date;
    }

    public String getReg_email() {
        return reg_email;
    }

    public void setReg_email(String reg_email) {
        this.reg_email = reg_email;
    }

    public String getUdt_date() {
        return udt_date;
    }

    public void setUdt_date(String udt_date) {
        this.udt_date = udt_date;
    }

    public String getUdt_email() {
        return udt_email;
    }

    public void setUdt_email(String udt_email) {
        this.udt_email = udt_email;
    }

    @Override
    public String toString() {
        return "FileDTO{" +
                "file_seq=" + file_seq +
                ", file_key='" + file_key + '\'' +
                ", file_type='" + file_type + '\'' +
                ", file_name='" + file_name + '\'' +
                ", file_origin_name='" + file_origin_name + '\'' +
                ", file_contents=" + file_contents +
                ", file_ext='" + file_ext + '\'' +
                ", file_size='" + file_size + '\'' +
                ", reg_date='" + reg_date + '\'' +
                ", reg_email='" + reg_email + '\'' +
                ", udt_date='" + udt_date + '\'' +
                ", udt_email='" + udt_email + '\'' +
                '}';
    }
}
