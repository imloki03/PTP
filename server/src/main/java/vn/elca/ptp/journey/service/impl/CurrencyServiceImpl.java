package vn.elca.ptp.journey.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.journey.dto.CurrencyDTO;
import vn.elca.ptp.journey.mapper.CurrencyMapper;
import vn.elca.ptp.journey.repository.CurrencyRepository;
import vn.elca.ptp.journey.service.CurrencyService;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {
    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    @Override
    public List<CurrencyDTO> getAllCurrencies() {
        return currencyMapper.toDto(currencyRepository.findAll());
    }
}
