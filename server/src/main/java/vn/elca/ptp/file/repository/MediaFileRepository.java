package vn.elca.ptp.file.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.elca.ptp.file.domain.MediaFile;

public interface MediaFileRepository extends JpaRepository<MediaFile, Long>, MediaFileRepositoryCustom {
    Optional<MediaFile> findByIdAndDeletedFalse(Long id);
    List<MediaFile> findByJourneyIdAndDeletedFalse(Long journeyId);
    List<MediaFile> findByJourneyIdInAndDeletedFalse(List<Long> journeyIds);
    Optional<MediaFile> findFirstByJourneyIdAndDeletedFalseOrderByIdAsc(Long journeyId);
}
