package vn.elca.ptp.file;

public record MediaFilesChangedEvent(Long journeyId, Long firstImageId, String firstImageUrl, String firstImageStorageType) {
}
