package vn.elca.ptp.journey.service.impl;

import static vn.elca.ptp.common.constant.MessageKey.COUNTRY_NOT_FOUND;
import static vn.elca.ptp.common.constant.MessageKey.CURRENCY_NOT_FOUND;
import static vn.elca.ptp.common.constant.MessageKey.JOURNEY_NOT_FOUND;
import static vn.elca.ptp.common.constant.MessageKey.PLACE_NOT_FOUND;
import static vn.elca.ptp.common.constant.MessageKey.PLACE_NOT_IN_COUNTRY;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import vn.elca.ptp.common.util.MessageBundleUtils;
import vn.elca.ptp.journey.domain.Journey;
import vn.elca.ptp.journey.domain.Place;
import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyFilter;
import vn.elca.ptp.journey.dto.JourneyRequest;
import vn.elca.ptp.journey.exception.PlaceNotInCountryException;
import vn.elca.ptp.journey.mapper.JourneyMapper;
import vn.elca.ptp.journey.repository.CountryRepository;
import vn.elca.ptp.journey.repository.CurrencyRepository;
import vn.elca.ptp.journey.repository.JourneyRepository;
import vn.elca.ptp.journey.repository.PlaceRepository;
import vn.elca.ptp.journey.service.JourneyService;

@Service
@AllArgsConstructor
@Transactional
public class JourneyServiceImpl implements JourneyService {
    private final JourneyRepository journeyRepository;
    private final CountryRepository countryRepository;
    private final PlaceRepository placeRepository;
    private final CurrencyRepository currencyRepository;
    private final JourneyMapper journeyMapper;
    private final MessageBundleUtils messageBundleUtils;

    @Override
    public JourneyDTO createJourney(JourneyRequest request) {
        Journey journey = journeyMapper.toEntity(request);
        resolveReferences(journey, request);
        journey = journeyRepository.save(journey);
        return journeyMapper.toDto(journey);
    }

    @Override
    public Page<JourneyDTO> searchJourneys(Pageable pageable, JourneyFilter filter) {
        return journeyRepository.searchJourneys(pageable, filter);
    }

    @Override
    public JourneyDTO getJourney(Long journeyId) {
        Journey journey = journeyRepository.findById(journeyId)
                .orElseThrow(() -> new EntityNotFoundException(
                        messageBundleUtils.getMessage(JOURNEY_NOT_FOUND, journeyId)));
        return journeyMapper.toDto(journey);
    }

    @Override
    public JourneyDTO updateJourney(Long journeyId, JourneyRequest request) {
        Journey existing = journeyRepository.findById(journeyId)
                .orElseThrow(() -> new EntityNotFoundException(
                        messageBundleUtils.getMessage(JOURNEY_NOT_FOUND, journeyId)));
        journeyMapper.updateEntity(existing, request);
        resolveReferences(existing, request);
        existing = journeyRepository.save(existing);
        return journeyMapper.toDto(existing);
    }

    @Override
    public void deleteJourney(Long journeyId) {
        if (!journeyRepository.existsById(journeyId)) {
            throw new EntityNotFoundException(
                    messageBundleUtils.getMessage(JOURNEY_NOT_FOUND, journeyId));
        }
        journeyRepository.deleteById(journeyId);
    }

    //TODO: add a batch delete method

    private void resolveReferences(Journey journey, JourneyRequest request) {
        journey.setCountry(countryRepository.findById(request.countryId())
                .orElseThrow(() -> new EntityNotFoundException(
                        messageBundleUtils.getMessage(COUNTRY_NOT_FOUND, request.countryId()))));
        if (request.placeId() != null) {
            Place place = placeRepository.findById(request.placeId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            messageBundleUtils.getMessage(PLACE_NOT_FOUND, request.placeId())));
            if (!place.getCountry().getId().equals(request.countryId())) {
                throw new PlaceNotInCountryException(
                        messageBundleUtils.getMessage(PLACE_NOT_IN_COUNTRY, place.getName(), journey.getCountry().getName()));
            }
            journey.setPlace(place);
        }
        if (request.currencyId() != null) {
            journey.setCurrency(currencyRepository.findById(request.currencyId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            messageBundleUtils.getMessage(CURRENCY_NOT_FOUND, request.currencyId()))));
        }
    }
}
