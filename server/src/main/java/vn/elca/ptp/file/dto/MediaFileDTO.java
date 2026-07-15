package vn.elca.ptp.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.elca.ptp.file.domain.enums.FileType;
import vn.elca.ptp.file.domain.enums.StorageType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaFileDTO {
    private Long id;
    private Long journeyId;
    private String fileName;
    private String originalName;
    private String mimeType;
    private FileType fileType;
    private StorageType storageType;
    private String url;
    private Boolean deleted;
}
