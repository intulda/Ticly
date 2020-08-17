package io.ticly.mint.admin.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

@Service
public class AdminFileUploadService {



    public String restore(MultipartFile multipartFile, String prefixPath) {

        String fileUrl = null;

        try {
            // 파일 정보
            String originFilename = multipartFile.getOriginalFilename();
            assert originFilename != null;
            String extName
                    = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
            Long size = multipartFile.getSize();

            // 서버에서 저장 할 파일 이름
            String saveFileName = getSaveFileName(extName);

            System.out.println("originFilename : " + originFilename);
            System.out.println("extensionName : " + extName);
            System.out.println("size : " + size);
            System.out.println("saveFileName : " + saveFileName);

            writeFile(multipartFile, saveFileName, prefixPath);
            fileUrl = prefixPath + saveFileName;

        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fileUrl;
    }


    // 현재 시간을 기준으로 파일 이름 생성
    private String getSaveFileName(String extName) {
        String fileName = "";

        Calendar calendar = Calendar.getInstance();
        fileName += calendar.get(Calendar.YEAR);
        fileName += calendar.get(Calendar.MONTH);
        fileName += calendar.get(Calendar.DATE);
        fileName += calendar.get(Calendar.HOUR);
        fileName += calendar.get(Calendar.MINUTE);
        fileName += calendar.get(Calendar.SECOND);
        fileName += calendar.get(Calendar.MILLISECOND);
        fileName += extName;

        return fileName;
    }


    // 파일을 실제로 write 하는 메소드
    private boolean writeFile(MultipartFile multipartFile, String saveFileName, String savePath)
            throws IOException {
        boolean result = false;

        byte[] data = multipartFile.getBytes();
        FileOutputStream fos = new FileOutputStream(savePath + "/" + saveFileName);
        fos.write(data);
        fos.close();

        return result;
    }
    
    
    // 파일 이미지를 byte[]로 변환하는 메소드
    public static byte[] imageToByteArray(String filePath) throws Exception {

        byte[] returnValue = null;

        ByteArrayOutputStream baos = null;
        FileInputStream fis = null;

        try{
            baos = new ByteArrayOutputStream();
            fis = new FileInputStream(filePath);

            byte[] buf = new byte[1024];
            int read = 0;

            while ((read=fis.read(buf, 0, buf.length)) != -1) {
                baos.write(buf, 0, read);
            }

            returnValue = baos.toByteArray();
        }
        catch (Exception e){
            e.printStackTrace();
        }finally {
            if (baos != null){
                baos.close();
            }
            if (fis != null){
                fis.close();
            }
        }
        return returnValue;
    }


    
    
}
