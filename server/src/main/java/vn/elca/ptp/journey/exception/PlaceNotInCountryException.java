package vn.elca.ptp.journey.exception;

public class PlaceNotInCountryException extends IllegalArgumentException {
    public PlaceNotInCountryException(String message) {
        super(message);
    }
}
