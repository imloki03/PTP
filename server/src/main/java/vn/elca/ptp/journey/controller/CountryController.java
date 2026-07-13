package vn.elca.ptp.journey.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.dto.ApiResponse;
import vn.elca.ptp.journey.dto.CountryDTO;
import vn.elca.ptp.journey.mapper.CountryMapper;
import vn.elca.ptp.journey.mapper.PlaceMapper;
import vn.elca.ptp.journey.repository.CountryRepository;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;
    private final PlaceMapper placeMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CountryDTO>>> getCountries() {
        List<CountryDTO> countries = countryRepository.findAll()
                .stream()
                .map(countryMapper::toDtoWithCountry)
                .toList();
        return ResponseEntity.ok(ApiResponse.success(countries));
    }
}
