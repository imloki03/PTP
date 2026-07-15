package vn.elca.ptp.file.service.impl;

import static vn.elca.ptp.common.constant.MessageKey.FILE_STORAGE_DIR_CREATE;
import static vn.elca.ptp.common.constant.MessageKey.FILE_STORAGE_FAILED;
import static vn.elca.ptp.file.util.MediaFileUtils.extractFileNameFromUrl;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.elca.ptp.common.util.MessageBundleUtils;
import vn.elca.ptp.file.config.FileProperties;
import vn.elca.ptp.file.exception.FileStorageException;
import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.service.FileStorageService;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "ptp.file.storage-type", havingValue = "LOCAL", matchIfMissing = true)
public class LocalFileStorageService implements FileStorageService {

    private final FileProperties fileProperties;
    private final MessageBundleUtils messageBundleUtils;

    @Getter
    private Path uploadPath;

    @PostConstruct
    void init() {
        uploadPath = Paths.get(fileProperties.getUploadDir()).toAbsolutePath().normalize();
        createUploadDir();
        log.info("Local file storage initialized at: {}", uploadPath);
    }

    @Override
    public String save(MediaFile entry, MultipartFile file) {
        if (!Files.exists(uploadPath)) {
            createUploadDir();
        }

        String storedName = entry.getFileName();
        Path targetPath = uploadPath.resolve(storedName);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileStorageException(messageBundleUtils.getMessage(FILE_STORAGE_FAILED, storedName), e);
        }

        return "/api/files/download/" + URLEncoder.encode(storedName, StandardCharsets.UTF_8);
    }

    @Override
    public void delete(MediaFile entry) {
        String fileName = extractFileNameFromUrl(entry.getUrl());
        if (fileName == null) {
            return;
        }
        try {
            Path targetPath = uploadPath.resolve(fileName);
            Files.deleteIfExists(targetPath);
        } catch (IOException e) {
            log.warn("Failed to delete file: {}", fileName, e);
        }
    }

    private void createUploadDir() {
        try {
            Files.createDirectories(uploadPath);
        } catch (IOException e) {
            throw new FileStorageException(messageBundleUtils.getMessage(FILE_STORAGE_DIR_CREATE, uploadPath.toString()), e);
        }
    }
}
