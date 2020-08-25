package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.FileDTO;

import java.util.List;

public class FileDAO implements FileDAOimpl{
    @Override
    public int SaveFile(FileDTO fileDTO) throws Exception {



        return 0;
    }

    @Override
    public List<ArticleDAO> FileListAll() throws Exception {
        return null;
    }

    @Override
    public int FileDetail(int file_seq) throws Exception {
        return 0;
    }

    @Override
    public void FileUpdate(FileDAO fileDAO) throws Exception {

    }

    @Override
    public void FileDelete(int file_seq) throws Exception {

    }
}
