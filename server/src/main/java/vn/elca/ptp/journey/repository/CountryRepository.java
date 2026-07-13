package vn.elca.ptp.journey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import vn.elca.ptp.journey.domain.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    @Override
    @NonNull
    @EntityGraph(attributePaths = "places")
    List<Country> findAll();
}
