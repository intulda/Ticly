package io.ticly.mint.util;

import org.apache.commons.codec.binary.Base64;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

/**
 * 공통적인 처리가 필요한 메소드를 가지는 클래스
 */
public class CommonUtil {

    /**
     * Blob image데이터를 base64 String type으로 변환하는 메소드
     * @param blobImage
     * @return
     * @throws SQLException
     */
    public static String blobImageChange(byte[] blobImage) throws SQLException {
        String dataStr = "";
        if(blobImage != null) {
            byte[] imgByte = blobImage;
            String base64String = Base64.encodeBase64String(imgByte);
            dataStr = "data:image/png;base64," + base64String;
        }
        return dataStr;
    }

    /**
     * 패스워드 SHA-512 암호화 메소드
     * @param password
     * @return
     */
    public static String passwordEncoding(String password) {
        String raw = password;
        String hex = "";
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-512");
            md.update(raw.getBytes());
            hex = String.format("%0128x", new BigInteger(1, md.digest()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return hex;
    }

    public static String subStringBytes(String str, int byteLength, int sizePerLetter) {
        int retLength = 0;
        int tempSize = 0;
        int asc;
        if (str == null || "".equals(str) || "null".equals(str)) {
            str = "";
        }

        int length = str.length();

        for (int i = 1; i <= length; i++) {
            asc = (int) str.charAt(i - 1);
            if (asc > 127) {
                if (byteLength >= tempSize + sizePerLetter) {
                    tempSize += sizePerLetter;
                    retLength++;
                }
            } else {
                if (byteLength > tempSize) {
                    tempSize++;
                    retLength++;
                }
            }
        }

        return str.substring(0, retLength);
    }

}
