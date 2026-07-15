package vn.elca.ptp.file.service.impl;

import static vn.elca.ptp.common.constant.MessageKey.FILE_NOT_FOUND;
import static vn.elca.ptp.common.constant.MessageKey.FILE_PERSISTENCE_FAILED;
import static vn.elca.ptp.common.constant.MessageKey.FILE_STORAGE_FAILED;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.elca.ptp.common.util.MessageBundleUtils;
import vn.elca.ptp.file.MediaFilesChangedEvent;
import vn.elca.ptp.file.config.FileProperties;
import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.dto.MediaFileDTO;
import vn.elca.ptp.file.exception.FilePersistenceException;
import vn.elca.ptp.file.exception.FileStorageException;
import vn.elca.ptp.file.mapper.MediaFileMapper;
import vn.elca.ptp.file.repository.MediaFileRepository;
import vn.elca.ptp.file.service.FileStorageService;
import vn.elca.ptp.file.service.MediaFileService;
import vn.elca.ptp.file.util.MediaFileUtils;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MediaFileServiceImpl implements MediaFileService {
    private final MediaFileRepository mediaFileRepository;
    private final MediaFileMapper mediaFileMapper;
    private final FileProperties fileProperties;
    private final FileStorageService fileStorageService;
    private final ApplicationEventPublisher eventPublisher;
    private final MessageBundleUtils messageBundleUtils;

    @Override
    public List<MediaFileDTO> uploadFiles(Long journeyId, List<MultipartFile> files) {
        List<MediaFile> entries = new ArrayList<>();
        List<MediaFile> savedToDisk = new ArrayList<>();

        for (MultipartFile file : files) {
            MediaFile entry = createEntry(journeyId, file);
            entries.add(entry);
            try {
                String url = fileStorageService.save(entry, file);
                entry.setUrl(url);
                savedToDisk.add(entry);
            } catch (Exception e) {
                cleanupFiles(savedToDisk);
                throw new FileStorageException(messageBundleUtils.getMessage(FILE_STORAGE_FAILED, file.getOriginalFilename()), e);
            }
        }

        try {
            List<MediaFile> persisted = mediaFileRepository.saveAll(entries);
            publishFirstImageEvent(journeyId);
            return persisted.stream().map(mediaFileMapper::toDto).toList();
        } catch (Exception e) {
            cleanupFiles(savedToDisk);
            throw new FilePersistenceException(messageBundleUtils.getMessage(FILE_PERSISTENCE_FAILED), e);
        }
    }

    private void cleanupFiles(List<MediaFile> files) {
        for (MediaFile file : files) {
            try {
                fileStorageService.delete(file);
            } catch (Exception e) {
                log.warn("Failed to clean up file after rollback: {}", file.getFileName(), e);
            }
        }
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
        MediaFile entry = mediaFileRepository.findByIdAndDeletedFalse(fileId)
                .orElseThrow(() -> new EntityNotFoundException(messageBundleUtils.getMessage(FILE_NOT_FOUND, fileId)));
        return mediaFileMapper.toDto(entry);
    }

    @Override
    public void deleteFile(Long fileId) {
        MediaFile entry = mediaFileRepository.findByIdAndDeletedFalse(fileId)
                .orElseThrow(() -> new EntityNotFoundException(messageBundleUtils.getMessage(FILE_NOT_FOUND, fileId)));
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
