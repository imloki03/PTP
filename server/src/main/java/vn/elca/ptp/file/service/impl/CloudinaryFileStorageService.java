package vn.elca.ptp.file.service.impl;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.service.FileStorageService;

@Slf4j
@Service
@ConditionalOnProperty(name = "ptp.file.storage-type", havingValue = "CLOUDINARY")
public class CloudinaryFileStorageService implements FileStorageService {

    @Override
    public String save(MediaFile entry, MultipartFile file) {
        //TODO: dư time thì làm
        return null;
    }

    @Override
    public void delete(MediaFile entry) {
        //TODO: dư time thì làm
    }
}
