package com.efrei.gacha.integration;

import com.efrei.gacha.integration.dto.INaturalistTaxon;
import com.efrei.gacha.integration.dto.INaturalistTaxonDetail;
import com.efrei.gacha.integration.dto.Place;
import com.efrei.gacha.integration.dto.PlaceAutocompleteResponse;
import com.efrei.gacha.integration.dto.SpeciesCountResult;
import com.efrei.gacha.integration.dto.SpeciesCountsResponse;
import com.efrei.gacha.integration.dto.TaxaDetailResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class INaturalistClient {

    private static final Logger log = LoggerFactory.getLogger(INaturalistClient.class);
    private static final int DESCRIPTION_BATCH_SIZE = 30;

    private final RestClient restClient;

    public INaturalistClient() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5_000);
        requestFactory.setReadTimeout(10_000);

        this.restClient = RestClient.builder()
                .requestFactory(requestFactory)
                .baseUrl("https://api.inaturalist.org/v1")
                .build();
    }

    public Long resolvePlaceId(String placeName) {
        try {
            PlaceAutocompleteResponse response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/places/autocomplete")
                            .queryParam("q", placeName)
                            .build())
                    .retrieve()
                    .body(PlaceAutocompleteResponse.class);

            if (response == null || response.results() == null || response.results().isEmpty()) {
                log.warn("Aucun lieu trouve pour {}", placeName);
                return null;
            }

            Place place = response.results().stream()
                    .max(Comparator.comparingDouble(p -> p.bboxArea() != null ? p.bboxArea() : 0.0))
                    .orElse(response.results().get(0));

            log.info("Lieu resolu pour '{}' : {} (id {})", placeName, place.name(), place.id());
            return place.id();
        } catch (RuntimeException e) {
            log.warn("Resolution du lieu {} echouee : {}", placeName, e.getMessage());
            return null;
        }
    }

    public List<INaturalistTaxon> getSpeciesByConservationStatus(String csiCode, int limit, Long placeId) {
        try {
            SpeciesCountsResponse response = restClient.get()
                    .uri(uriBuilder -> {
                        uriBuilder.path("/observations/species_counts")
                                .queryParam("csi", csiCode)
                                .queryParam("per_page", limit);
                        if (placeId != null) {
                            uriBuilder.queryParam("place_id", placeId);
                        }
                        return uriBuilder.build();
                    })
                    .retrieve()
                    .body(SpeciesCountsResponse.class);

            if (response == null || response.results() == null) {
                return List.of();
            }

            return response.results().stream()
                    .map(SpeciesCountResult::taxon)
                    .filter(taxon -> taxon.defaultPhoto() != null && taxon.defaultPhoto().mediumUrl() != null)
                    .toList();
        } catch (RuntimeException e) {
            log.warn("Appel iNaturalist echoue pour le code IUCN {} (place {}) : {}", csiCode, placeId, e.getMessage());
            return List.of();
        }
    }

    public Map<Long, String> getDescriptions(List<Long> taxonIds) {
        if (taxonIds.isEmpty()) {
            return Map.of();
        }
        Map<Long, String> descriptions = new HashMap<>();
        for (int i = 0; i < taxonIds.size(); i += DESCRIPTION_BATCH_SIZE) {
            List<Long> batch = taxonIds.subList(i, Math.min(i + DESCRIPTION_BATCH_SIZE, taxonIds.size()));
            descriptions.putAll(fetchDescriptionsBatch(batch));
        }
        return descriptions;
    }

    private Map<Long, String> fetchDescriptionsBatch(List<Long> taxonIds) {
        try {
            String ids = taxonIds.stream().map(String::valueOf).collect(Collectors.joining(","));
            TaxaDetailResponse response = restClient.get()
                    .uri("/taxa/{ids}", ids)
                    .retrieve()
                    .body(TaxaDetailResponse.class);

            if (response == null || response.results() == null) {
                return Map.of();
            }

            return response.results().stream()
                    .filter(taxon -> taxon.wikipediaSummary() != null)
                    .collect(Collectors.toMap(INaturalistTaxonDetail::id, taxon -> stripHtml(taxon.wikipediaSummary())));
        } catch (RuntimeException e) {
            log.warn("Recuperation des descriptions echouee : {}", e.getMessage());
            return Map.of();
        }
    }

    private String stripHtml(String html) {
        return html.replaceAll("<[^>]+>", "").trim();
    }
}