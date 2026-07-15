package vn.elca.ptp.file.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.elca.ptp.file.domain.MediaFile;

public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {
    List<MediaFile> findByJourneyIdAndDeletedFalse(Long journeyId);
    Optional<MediaFile> findFirstByJourneyIdAndDeletedFalseOrderByIdAsc(Long journeyId);
}
