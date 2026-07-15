package vn.elca.ptp.file.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.elca.ptp.common.domain.BaseEntity;
import vn.elca.ptp.file.domain.enums.FileType;
import vn.elca.ptp.file.domain.enums.StorageType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MEDIA_FILE")
public class MediaFile extends BaseEntity {
    @Column(nullable = false)
    private Long journeyId;

    @Column(nullable = false)
    private String fileName;

    private String originalName;

    @Column(nullable = false)
    private String mimeType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileType fileType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StorageType storageType;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private Boolean deleted = false;
}
