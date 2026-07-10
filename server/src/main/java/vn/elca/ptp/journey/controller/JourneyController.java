package vn.elca.ptp.journey.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyRequest;
import vn.elca.ptp.journey.service.JourneyService;

@RestController
@RequestMapping("/api/journeys")
@RequiredArgsConstructor
public class JourneyController {
    private final JourneyService journeyService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JourneyDTO createJourney(@Valid @RequestBody JourneyRequest request) {
        return journeyService.createJourney(request);
    }

    @GetMapping("/{journeyId}")
    public JourneyDTO getJourney(@PathVariable Long journeyId) {
        return journeyService.getJourney(journeyId);
    }

    @PutMapping("/{journeyId}")
    public JourneyDTO updateJourney(@PathVariable Long journeyId, @Valid @RequestBody JourneyRequest request) {
        return journeyService.updateJourney(journeyId, request);
    }

    @DeleteMapping("/{journeyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJourney(@PathVariable Long journeyId) {
        journeyService.deleteJourney(journeyId);
    }
}
