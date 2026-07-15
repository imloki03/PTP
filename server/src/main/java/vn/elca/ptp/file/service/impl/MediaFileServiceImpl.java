package vn.elca.ptp.file.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.event.MediaFilesChangedEvent;
import vn.elca.ptp.file.config.FileProperties;
import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.dto.MediaFileDTO;
import vn.elca.ptp.file.mapper.MediaFileMapper;
import vn.elca.ptp.file.repository.MediaFileRepository;
import vn.elca.ptp.file.service.FileStorageService;
import vn.elca.ptp.file.service.MediaFileService;
import vn.elca.ptp.file.util.MediaFileUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class MediaFileServiceImpl implements MediaFileService {
    private final MediaFileRepository mediaFileRepository;
    private final MediaFileMapper mediaFileMapper;
    private final FileProperties fileProperties;
    private final FileStorageService fileStorageService;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public List<MediaFileDTO> uploadFiles(Long journeyId, List<MultipartFile> files) {
        List<MediaFile> saved = new ArrayList<>();
        //TODO improve performance
        for (MultipartFile file : files) {
            MediaFile entry = createEntry(journeyId, file);
            //TODO rollback
            String url = fileStorageService.save(entry, file);
            entry.setUrl(url);
            saved.add(mediaFileRepository.save(entry));
        }

        publishFirstImageEvent(journeyId);

        return saved.stream().map(mediaFileMapper::toDto).toList();
    }

    @Override
    public MediaFileDTO uploadFile(Long journeyId, MultipartFile file) {
        return uploadFiles(journeyId, List.of(file)).getFirst();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MediaFileDTO> getFilesByJourney(Long journeyId) {
        return mediaFileRepository.findByJourneyIdAndDeletedFalse(journeyId)
                .stream().map(mediaFileMapper::toDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MediaFileDTO getFile(Long fileId) {
        MediaFile entry = mediaFileRepository.findById(fileId)
                .filter(mf -> !Boolean.TRUE.equals(mf.getDeleted()))
                .orElseThrow(() -> new EntityNotFoundException("File not found: " + fileId));
        return mediaFileMapper.toDto(entry);
    }

    @Override
    public void deleteFile(Long fileId) {
        MediaFile entry = mediaFileRepository.findById(fileId)
                .filter(mf -> !Boolean.TRUE.equals(mf.getDeleted()))
                .orElseThrow(() -> new EntityNotFoundException("File not found: " + fileId));
        Long journeyId = entry.getJourneyId();
        fileStorageService.delete(entry);
        entry.setDeleted(true);
        mediaFileRepository.save(entry);
        publishFirstImageEvent(journeyId);
    }

    private void publishFirstImageEvent(Long journeyId) {
        MediaFile first = mediaFileRepository
                .findFirstByJourneyIdAndDeletedFalseOrderByIdAsc(journeyId)
                .orElse(null);
        eventPublisher.publishEvent(new MediaFilesChangedEvent(
                journeyId,
                first != null ? first.getId() : null,
                first != null ? first.getUrl() : null,
                first != null ? String.valueOf(first.getStorageType()) : null));
    }

    private MediaFile createEntry(Long journeyId, MultipartFile file) {
        MediaFile entry = new MediaFile();
        entry.setJourneyId(journeyId);
        entry.setFileName(MediaFileUtils.generateFileName(file.getOriginalFilename()));
        entry.setOriginalName(file.getOriginalFilename());
        entry.setMimeType(file.getContentType());
        entry.setFileType(MediaFileUtils.resolveFileType(file.getContentType()));
        entry.setStorageType(fileProperties.getStorageType());
        return entry;
    }
}
