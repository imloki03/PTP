package vn.elca.ptp.file.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import vn.elca.ptp.file.dto.MediaFileDTO;

public interface MediaFileService {
    List<MediaFileDTO> uploadFiles(Long journeyId, List<MultipartFile> files);
    MediaFileDTO uploadFile(Long journeyId, MultipartFile file);
    List<MediaFileDTO> getFilesByJourney(Long journeyId);
    MediaFileDTO getFile(Long fileId);
    void deleteFile(Long fileId);
}
