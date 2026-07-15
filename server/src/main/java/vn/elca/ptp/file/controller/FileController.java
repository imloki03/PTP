package vn.elca.ptp.file.controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.dto.ApiResponse;
import vn.elca.ptp.file.dto.MediaFileDTO;
import vn.elca.ptp.file.service.MediaFileService;
import vn.elca.ptp.file.service.impl.LocalFileStorageService;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final MediaFileService mediaFileService;
    private final LocalFileStorageService localFileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestParam("files") List<MultipartFile> files,
                                         @RequestParam(value = "journeyId") Long journeyId) {
        List<MediaFileDTO> result = mediaFileService.uploadFiles(journeyId, files);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/journey/{journeyId}")
    public ResponseEntity<?> getJourneyFiles(@PathVariable Long journeyId) {
        List<MediaFileDTO> files = mediaFileService.getFilesByJourney(journeyId);
        return ResponseEntity.ok(ApiResponse.success(files));
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getFile(@PathVariable Long fileId) {
        MediaFileDTO file = mediaFileService.getFile(fileId);
        return ResponseEntity.ok(ApiResponse.success(file));
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable Long fileId) {
        mediaFileService.deleteFile(fileId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName) {
        try {
            String decoded = URLDecoder.decode(fileName, StandardCharsets.UTF_8);
            Path filePath = localFileStorageService.getUploadPath().resolve(decoded).normalize();
            if (!filePath.startsWith(localFileStorageService.getUploadPath())) {
                return ResponseEntity.badRequest().body(ApiResponse.failure("Invalid file path"));
            }
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
