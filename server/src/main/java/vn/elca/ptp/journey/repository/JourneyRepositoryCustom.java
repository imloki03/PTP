package vn.elca.ptp.journey.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyFilter;

public interface JourneyRepositoryCustom {
    Page<JourneyDTO> searchJourneys(Pageable pageable, JourneyFilter filter);
}
