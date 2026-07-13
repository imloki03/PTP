package vn.elca.ptp.journey.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyFilter;
import vn.elca.ptp.journey.dto.JourneyRequest;

public interface JourneyService {
    JourneyDTO createJourney(JourneyRequest journeyDTO);
    JourneyDTO getJourney(Long journeyId);
    Page<JourneyDTO> searchJourneys(Pageable pageable, JourneyFilter filter);
    JourneyDTO updateJourney(Long journeyId, JourneyRequest journeyDTO);
    void deleteJourney(Long journeyId);
}
