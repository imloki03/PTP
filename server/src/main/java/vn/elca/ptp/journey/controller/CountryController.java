package vn.elca.ptp.journey.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.dto.ApiResponse;
import vn.elca.ptp.journey.dto.CountryDTO;
import vn.elca.ptp.journey.service.CountryService;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CountryDTO>>> getCountries() {
        return ResponseEntity.ok(ApiResponse.success(countryService.getAllCountries()));
    }
}
