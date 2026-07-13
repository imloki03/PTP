package vn.elca.ptp.journey.mapper;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.journey.domain.Country;
import vn.elca.ptp.journey.dto.CountryDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface CountryMapper {
    @Named("toDto")
    @Mapping(target = "places", ignore = true)
    CountryDTO toDto(Country country);

    @Named("toDtoWithCountry")
    CountryDTO toDtoWithCountry(Country country);

    @IterableMapping(qualifiedByName = "toDtoWithCountry")
    List<CountryDTO> toDto(List<Country> countries);
}
