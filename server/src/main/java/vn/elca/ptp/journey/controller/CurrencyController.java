package vn.elca.ptp.journey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.dto.ApiResponse;
import vn.elca.ptp.journey.service.CurrencyService;

@RestController
@RequestMapping("/api/currencies")
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService currencyService;

    @GetMapping
    public ResponseEntity<?> getCurrencies() {
        return ResponseEntity.ok(ApiResponse.success(currencyService.getAllCurrencies()));
    }
}
