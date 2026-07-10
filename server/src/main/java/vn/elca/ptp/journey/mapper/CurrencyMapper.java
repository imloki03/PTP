package vn.elca.ptp.journey.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.journey.domain.Currency;
import vn.elca.ptp.journey.dto.CurrencyDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface CurrencyMapper {
    CurrencyDTO toDto(Currency currency);
}
