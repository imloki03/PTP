package vn.elca.ptp.journey.repository.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import vn.elca.ptp.journey.domain.Journey;
import vn.elca.ptp.journey.domain.QJourney;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;
import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyFilter;
import vn.elca.ptp.journey.mapper.JourneyMapper;
import vn.elca.ptp.journey.repository.JourneyRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class JourneyRepositoryCustomImpl implements JourneyRepositoryCustom {
    private final EntityManager entityManager;
    private final JourneyMapper journeyMapper;

    @Override
    public Page<JourneyDTO> searchJourneys(Pageable pageable, JourneyFilter filter) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QJourney journey = QJourney.journey;
        BooleanBuilder predicate = buildPredicate(filter, journey);

        Long total = queryFactory
                .select(journey.count())
                .from(journey)
                .where(predicate)
                .fetchOne();

        List<Journey> content = queryFactory
                .selectFrom(journey)
                .leftJoin(journey.country).fetchJoin()
                .leftJoin(journey.place).fetchJoin()
                .leftJoin(journey.currency).fetchJoin()
                .where(predicate)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(journey.startDate.desc())
                .fetch();

        List<JourneyDTO> dtos = content.stream()
                .map(journeyMapper::toDto)
                .toList();

        return new PageImpl<>(dtos, pageable, total);
    }

    private BooleanBuilder buildPredicate(JourneyFilter filter, QJourney journey) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(journey.status.ne(JourneyStatus.DELETED));

        if (StringUtils.isNotBlank(filter.searchQuery())) {
            String pattern = "%" + filter.searchQuery().trim().toLowerCase() + "%";
            builder.and(journey.name.lower().like(pattern)
                    .or(journey.description.lower().like(pattern)));
        }
        if (filter.countryId() != null) {
            builder.and(journey.country.id.eq(filter.countryId()));
        }
        if (filter.currencyId() != null) {
            builder.and(journey.currency.id.eq(filter.currencyId()));
        }
        if (filter.status() != null) {
            builder.and(journey.status.eq(filter.status()));
        }
        if (filter.amountFrom() != null) {
            builder.and(journey.amount.goe(filter.amountFrom()));
        }
        if (filter.amountTo() != null) {
            builder.and(journey.amount.loe(filter.amountTo()));
        }
        if (filter.startDateFrom() != null) {
            builder.and(journey.startDate.goe(filter.startDateFrom()));
        }
        if (filter.startDateTo() != null) {
            builder.and(journey.startDate.loe(filter.startDateTo()));
        }
        if (filter.endDateFrom() != null) {
            builder.and(journey.endDate.goe(filter.endDateFrom()));
        }
        if (filter.endDateTo() != null) {
            builder.and(journey.endDate.loe(filter.endDateTo()));
        }

        return builder;
    }
}
