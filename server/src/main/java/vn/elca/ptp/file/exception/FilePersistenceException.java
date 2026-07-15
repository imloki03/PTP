package vn.elca.ptp.file.exception;

import vn.elca.ptp.common.exception.BusinessException;

public class FilePersistenceException extends BusinessException {
    public FilePersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
