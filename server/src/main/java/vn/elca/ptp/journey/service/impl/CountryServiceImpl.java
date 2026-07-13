package vn.elca.ptp.journey.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.journey.dto.CountryDTO;
import vn.elca.ptp.journey.mapper.CountryMapper;
import vn.elca.ptp.journey.repository.CountryRepository;
import vn.elca.ptp.journey.service.CountryService;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    @Override
    public List<CountryDTO> getAllCountries() {
        return countryMapper.toDto(countryRepository.findAll());
    }
}
