package vn.elca.ptp.journey.event;

import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.elca.ptp.file.MediaFilesChangedEvent;
import vn.elca.ptp.journey.domain.Journey;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MediaFilesChangedEventHandler {

    private final EntityManager entityManager;

    @ApplicationModuleListener
    public void handleMediaFilesChanged(MediaFilesChangedEvent event) {
        Journey journey = entityManager.find(Journey.class, event.journeyId());
        if (journey == null) {
            log.warn("Journey {} not found for MediaFilesChangedEvent", event.journeyId());
            return;
        }
        journey.setFirstImageId(event.firstImageId());
        journey.setFirstImageUrl(event.firstImageUrl());
        journey.setFirstImageStorageType(event.firstImageStorageType());
        log.debug("Updated first image for journey {}: id={}, url={}, type={}",
                event.journeyId(), event.firstImageId(), event.firstImageUrl(), event.firstImageStorageType());
    }
}
