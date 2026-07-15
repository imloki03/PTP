package vn.elca.ptp.common.event;

import java.util.List;

public record JourneysDeletedEvent(List<Long> journeyIds) {
}
