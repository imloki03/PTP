package vn.elca.ptp.file.util;

import vn.elca.ptp.file.domain.enums.FileType;

public final class MediaFileUtils {
    private MediaFileUtils() {}
    public static String generateFileName(String originalName) {
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }
        return java.util.UUID.randomUUID() + extension;
    }

    public static FileType resolveFileType(String mimeType) {
        if (mimeType == null) {
            return FileType.OTHER;
        }
        if (mimeType.startsWith("image/")) {
            return FileType.IMAGE;
        }
        if (mimeType.startsWith("video/")) {
            return FileType.VIDEO;
        }
        return FileType.OTHER;
    }

    public static String extractFileNameFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }
        int lastSlash = url.lastIndexOf('/');
        if (lastSlash < 0) {
            return null;
        }
        return url.substring(lastSlash + 1);
    }
}
