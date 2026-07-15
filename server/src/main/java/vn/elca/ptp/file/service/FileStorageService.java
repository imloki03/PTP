package vn.elca.ptp.file.service;

import org.springframework.web.multipart.MultipartFile;

import vn.elca.ptp.file.domain.MediaFile;

public interface FileStorageService {
    String save(MediaFile entry, MultipartFile file);
    void delete(MediaFile entry);
}
