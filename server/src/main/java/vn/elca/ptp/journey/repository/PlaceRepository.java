package vn.elca.ptp.journey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.elca.ptp.journey.domain.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
}
