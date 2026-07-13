package vn.elca.ptp.journey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import vn.elca.ptp.journey.domain.Journey;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Long>, QuerydslPredicateExecutor<Journey>, JourneyRepositoryCustom {
}