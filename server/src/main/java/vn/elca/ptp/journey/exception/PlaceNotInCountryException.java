package vn.elca.ptp.journey.exception;

import vn.elca.ptp.common.exception.BusinessException;

public class PlaceNotInCountryException extends BusinessException {
    public PlaceNotInCountryException(String message) {
        super(message);
    }
}
