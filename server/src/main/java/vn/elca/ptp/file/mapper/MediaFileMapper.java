package vn.elca.ptp.file.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import vn.elca.ptp.file.domain.MediaFile;
import vn.elca.ptp.file.dto.MediaFileDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MediaFileMapper {
    MediaFileDTO toDto(MediaFile entity);
}
