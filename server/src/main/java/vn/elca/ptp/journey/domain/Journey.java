package vn.elca.ptp.journey.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.elca.ptp.common.domain.BaseEntity;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "JOURNEY")
public class Journey extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @ManyToOne()
    @JoinColumn(name = "place_id")
    private Place place;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne()
    @JoinColumn(name = "currency_id")
    private Currency currency;

    private Long amount;

    private Integer durationDay;

    private Integer durationNight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JourneyStatus status;
}
