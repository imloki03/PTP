package vn.elca.ptp.common.event;

public record MediaFilesChangedEvent(Long journeyId, Long firstImageId, String firstImageUrl, String firstImageStorageType) {
}
