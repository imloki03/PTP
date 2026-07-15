package vn.elca.ptp.journey.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.concurrent.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.test.context.ActiveProfiles;

import vn.elca.ptp.journey.domain.Country;
import vn.elca.ptp.journey.domain.enums.JourneyStatus;
import vn.elca.ptp.journey.dto.JourneyRequest;
import vn.elca.ptp.journey.repository.CountryRepository;

@SpringBootTest
@ActiveProfiles("test")
class JourneyOptimisticLockingTest {

    @Autowired
    private JourneyService journeyService;
    @Autowired
    private CountryRepository countryRepository;

    private Long countryId;

    @BeforeEach
    void setUp() {
        var c = new Country();
        c.setName("Test Country");
        c.setCode("TC");
        countryId = countryRepository.saveAndFlush(c).getId();
    }

    private JourneyRequest req(String name) {
        return new JourneyRequest(name, "desc", countryId, null,
                LocalDate.of(2026, 7, 1), null, null, null,
                null, null, JourneyStatus.PLANNING, null);
    }

    @Test
    void concurrentUpdate_shouldThrowOptimisticLockingFailureException() throws Exception {
        var saved = journeyService.createJourney(req("original"));
        var latch = new CountDownLatch(1);
        var executor = Executors.newFixedThreadPool(2);

        Future<?> f1 = executor.submit(() -> {
            latch.await();
            journeyService.updateJourney(saved.getId(), req("a"));
            return null;
        });
        Future<?> f2 = executor.submit(() -> {
            latch.await();
            journeyService.updateJourney(saved.getId(), req("b"));
            return null;
        });
        latch.countDown();

        int failed = 0;
        for (var f : new Future<?>[]{f1, f2}) {
            try { f.get(); } catch (ExecutionException e) {
                assertInstanceOf(ObjectOptimisticLockingFailureException.class, e.getCause());
                failed++;
            }
        }
        assertEquals(1, failed);

        executor.shutdown();
    }
}
