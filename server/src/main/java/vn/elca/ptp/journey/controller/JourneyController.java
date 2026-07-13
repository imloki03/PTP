package vn.elca.ptp.journey.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static vn.elca.ptp.common.constant.MessageKey.JOURNEY_CREATED;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.elca.ptp.common.constant.MessageKey;
import vn.elca.ptp.common.dto.ApiResponse;
import vn.elca.ptp.common.dto.PagedResponse;
import vn.elca.ptp.common.util.MessageBundleUtils;
import vn.elca.ptp.journey.dto.JourneyDTO;
import vn.elca.ptp.journey.dto.JourneyRequest;
import vn.elca.ptp.journey.service.JourneyService;

@RestController
@RequestMapping("/api/journeys")
@RequiredArgsConstructor
public class JourneyController {
    private final JourneyService journeyService;
    private final MessageBundleUtils messageBundleUtils;

    @PostMapping
    public ResponseEntity<?> createJourney(@Valid @RequestBody JourneyRequest request) {
        JourneyDTO journey = journeyService.createJourney(request);
        ApiResponse<JourneyDTO> response = ApiResponse.success(
                journey, messageBundleUtils.getMessage(JOURNEY_CREATED));
        response.add(linkTo(methodOn(JourneyController.class).getJourney(journey.getId())).withSelfRel());
        return ResponseEntity.created(response.getRequiredLink("self").toUri())
                .body(response);
    }

    @GetMapping("/{journeyId}")
    public ResponseEntity<?> getJourney(@PathVariable Long journeyId) {
        JourneyDTO journey = journeyService.getJourney(journeyId);
        ApiResponse<JourneyDTO> response = ApiResponse.success(journey);
        response.add(linkTo(methodOn(JourneyController.class).getJourney(journeyId)).withSelfRel());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getJourneys(@PageableDefault(size = 5) Pageable pageable) {
        Page<JourneyDTO> page = journeyService.getJourneys(pageable);
        PagedResponse<JourneyDTO> response = PagedResponse.from(page);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{journeyId}")
    public ResponseEntity<?> updateJourney(@PathVariable Long journeyId, @Valid @RequestBody JourneyRequest request) {
        JourneyDTO journey = journeyService.updateJourney(journeyId, request);
        ApiResponse<JourneyDTO> response = ApiResponse.success(
                journey, messageBundleUtils.getMessage(MessageKey.JOURNEY_UPDATED));
        response.add(linkTo(methodOn(JourneyController.class).getJourney(journeyId)).withSelfRel());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{journeyId}")
    public ResponseEntity<?> deleteJourney(@PathVariable Long journeyId) {
        journeyService.deleteJourney(journeyId);
        return ResponseEntity.ok(ApiResponse.success(null,
                messageBundleUtils.getMessage(MessageKey.JOURNEY_DELETED)));
    }
}
