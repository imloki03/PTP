package vn.elca.ptp.journey.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.journey.domain.Journey;
import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyRequest;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        uses = {CountryMapper.class, CurrencyMapper.class, PlaceMapper.class})
public interface JourneyMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "country", ignore = true)
    @Mapping(target = "place", ignore = true)
    @Mapping(target = "currency", ignore = true)
    Journey toEntity(JourneyRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "country", ignore = true)
    @Mapping(target = "place", ignore = true)
    @Mapping(target = "currency", ignore = true)
    void updateEntity(@MappingTarget Journey journey, JourneyRequest request);

    JourneyDTO toDto(Journey journey);
}
