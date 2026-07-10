package vn.elca.ptp.journey.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.journey.domain.Place;
import vn.elca.ptp.journey.dto.PlaceDTO;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        uses = CountryMapper.class)
public interface PlaceMapper {
    PlaceDTO toDto(Place place);
}
