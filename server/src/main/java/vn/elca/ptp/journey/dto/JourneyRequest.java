package vn.elca.ptp.journey.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;

public record JourneyRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull @Positive Long countryId,
        @Positive Long placeId,
        @NotNull LocalDate startDate,
        LocalDate endDate,
        @Positive Long currencyId,
        @Positive Long amount,
        @Positive Integer durationDay,
        @PositiveOrZero Integer durationNight,
        @NotNull JourneyStatus status) {
}
