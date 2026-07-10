package vn.elca.ptp.journey.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.journey.domain.Country;
import vn.elca.ptp.journey.dto.CountryDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface CountryMapper {
    CountryDTO toDto(Country country);
}
