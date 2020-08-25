package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.FileDTO;

import java.io.File;
import java.util.List;

public interface FileDAOimpl {

    public int SaveFile(FileDTO fileDTO) throws Exception;
    public List<ArticleDAO> FileListAll() throws Exception;
    public int FileDetail(int file_seq) throws Exception;
    public void FileUpdate (FileDAO fileDAO) throws Exception;
    public void FileDelete (int file_seq) throws Exception;

}
