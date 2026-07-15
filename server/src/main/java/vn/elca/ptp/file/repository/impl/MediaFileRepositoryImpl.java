package vn.elca.ptp.file.repository.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import vn.elca.ptp.file.domain.QMediaFile;
import vn.elca.ptp.file.repository.MediaFileRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class MediaFileRepositoryImpl implements MediaFileRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteByJourneyIds(List<Long> journeyIds) {
        QMediaFile mediaFile = QMediaFile.mediaFile;

        queryFactory.update(mediaFile)
                .set(mediaFile.deleted, true)
                .where(mediaFile.journeyId.in(journeyIds)
                        .and(mediaFile.deleted.eq(false)))
                .execute();
    }
}
