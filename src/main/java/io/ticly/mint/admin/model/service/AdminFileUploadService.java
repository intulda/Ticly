package io.ticly.mint.admin.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;

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


    // 파일을 실제로 write 하는 메서드
    private boolean writeFile(MultipartFile multipartFile, String saveFileName, String savePath)
            throws IOException {
        boolean result = false;

        byte[] data = multipartFile.getBytes();
        FileOutputStream fos = new FileOutputStream(savePath + "/" + saveFileName);
        fos.write(data);
        fos.close();

        return result;
    }
}
