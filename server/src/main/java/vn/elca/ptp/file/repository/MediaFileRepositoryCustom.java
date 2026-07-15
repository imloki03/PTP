package vn.elca.ptp.file.repository;

import java.util.List;

public interface MediaFileRepositoryCustom {
    void deleteByJourneyIds(List<Long> journeyIds);
}
