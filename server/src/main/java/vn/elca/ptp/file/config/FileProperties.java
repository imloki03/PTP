package vn.elca.ptp.file.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;
import vn.elca.ptp.file.domain.enums.StorageType;

@Getter
@Setter
@ConfigurationProperties(prefix = "ptp.file")
public class FileProperties {
    private StorageType storageType = StorageType.LOCAL;
    private String uploadDir = "uploads";
}
