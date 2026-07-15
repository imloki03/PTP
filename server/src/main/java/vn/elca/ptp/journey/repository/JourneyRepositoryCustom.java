package vn.elca.ptp.journey.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import vn.elca.ptp.journey.domain.Journey;
import vn.elca.ptp.journey.dto.JourneyFilter;

public interface JourneyRepositoryCustom {
    Page<Journey> searchJourneys(Pageable pageable, JourneyFilter filter);
}
