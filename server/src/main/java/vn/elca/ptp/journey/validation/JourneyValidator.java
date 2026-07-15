package vn.elca.ptp.journey.validation;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import vn.elca.ptp.journey.dto.JourneyRequest;

public class JourneyValidator implements ConstraintValidator<JourneyValid, JourneyRequest> {

    @Override
    public boolean isValid(JourneyRequest request, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        boolean valid = true;

        valid &= validateEndDate(request, context);
        valid &= validateDuration(request, context);

        return valid;
    }

    private boolean validateEndDate(JourneyRequest request, ConstraintValidatorContext context) {
        LocalDate start = request.startDate();
        LocalDate end = request.endDate();
        if (end != null && !end.isAfter(start)) {
            context.buildConstraintViolationWithTemplate("{validation.endDate.afterStart}")
                    .addPropertyNode("endDate")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }

    private boolean validateDuration(JourneyRequest request, ConstraintValidatorContext context) {
        boolean valid = true;
        Integer day = request.durationDay();
        Integer night = request.durationNight();

        if (day != null && day <= 0) {
            context.buildConstraintViolationWithTemplate("{validation.duration.positive}")
                    .addPropertyNode("durationDay")
                    .addConstraintViolation();
            valid = false;
        }
        if (night != null && night < 0) {
            context.buildConstraintViolationWithTemplate("{validation.duration.nonNegative}")
                    .addPropertyNode("durationNight")
                    .addConstraintViolation();
            valid = false;
        }
        if (day != null && night != null && day > 0 && night >= 0 && Math.abs(day - night) > 1) {
            context.buildConstraintViolationWithTemplate("{validation.duration.invalid}")
                    .addPropertyNode("duration")
                    .addConstraintViolation();
            valid = false;
        }

        LocalDate start = request.startDate();
        LocalDate end = request.endDate();
        if (end != null && day != null && day > 0) {
            long diff = ChronoUnit.DAYS.between(start, end) + 1;
            if (day > diff) {
                context.buildConstraintViolationWithTemplate("{validation.duration.dayMismatch}")
                        .addPropertyNode("durationDay")
                        .addConstraintViolation();
                valid = false;
            }
            if (night != null && night > 0 && night > diff) {
                context.buildConstraintViolationWithTemplate("{validation.duration.nightMismatch}")
                        .addPropertyNode("durationNight")
                        .addConstraintViolation();
                valid = false;
            }
        }
        return valid;
    }
}
