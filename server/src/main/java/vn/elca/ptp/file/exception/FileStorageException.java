package vn.elca.ptp.file.exception;

import vn.elca.ptp.common.exception.BusinessException;

public class FileStorageException extends BusinessException {
    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
