package vn.elca.ptp.journey.dto;

import java.time.LocalDate;

import vn.elca.ptp.journey.domain.enums.JourneyStatus;

public record JourneyFilter(
    String searchQuery,
    Long countryId,
    Long currencyId,
    JourneyStatus status,
    Long amountFrom,
    Long amountTo,
    LocalDate startDateFrom,
    LocalDate startDateTo,
    LocalDate endDateFrom,
    LocalDate endDateTo) {
}
