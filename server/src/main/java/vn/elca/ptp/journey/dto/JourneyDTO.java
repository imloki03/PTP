package vn.elca.ptp.journey.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JourneyDTO {
    private Integer id;
    private String name;
    private String description;
    private CountryDTO country;
    private PlaceDTO place;
    private LocalDate startDate;
    private LocalDate endDate;
    private CurrencyDTO currency;
    private Long amount;
    private Integer durationDay;
    private Integer durationNight;
    private JourneyStatus status;
}
