package vn.elca.ptp.journey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import vn.elca.ptp.journey.domain.Journey;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Long>, QuerydslPredicateExecutor<Journey>, JourneyRepositoryCustom {
    Optional<Journey> findByIdAndStatusNot(Long id, JourneyStatus status);
}