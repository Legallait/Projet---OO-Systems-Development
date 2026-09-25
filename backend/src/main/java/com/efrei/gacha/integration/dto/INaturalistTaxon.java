package com.efrei.gacha.integration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record INaturalistTaxon(
        Long id,
        String name,
        @JsonProperty("preferred_common_name") String preferredCommonName,
        @JsonProperty("wikipedia_url") String wikipediaUrl,
        @JsonProperty("default_photo") INaturalistPhoto defaultPhoto) {}
