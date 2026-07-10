package vn.elca.ptp.journey.service;

import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyRequest;

public interface JourneyService {
    JourneyDTO createJourney(JourneyRequest journeyDTO);
    JourneyDTO getJourney(Long journeyId);
    JourneyDTO updateJourney(Long journeyId, JourneyRequest journeyDTO);
    void deleteJourney(Long journeyId);
}
