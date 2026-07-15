package vn.elca.ptp.journey;

import java.util.List;

public record JourneysDeletedEvent(List<Long> journeyIds) {
}
