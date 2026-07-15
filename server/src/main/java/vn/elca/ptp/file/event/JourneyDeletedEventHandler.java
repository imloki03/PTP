package vn.elca.ptp.file.event;

import java.util.List;

import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.elca.ptp.common.event.JourneysDeletedEvent;
import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.repository.MediaFileRepository;
import vn.elca.ptp.file.service.FileStorageService;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JourneyDeletedEventHandler {
    private final MediaFileRepository mediaFileRepository;
    private final FileStorageService fileStorageService;

    @ApplicationModuleListener
    public void handleJourneysDeleted(JourneysDeletedEvent event) {
        List<MediaFile> files = mediaFileRepository.findByJourneyIdInAndDeletedFalse(event.journeyIds());
        if (files.isEmpty()) {
            return;
        }

        for (MediaFile file : files) {
            fileStorageService.delete(file);
        }
        mediaFileRepository.deleteByJourneyIds(event.journeyIds());
    }
}
