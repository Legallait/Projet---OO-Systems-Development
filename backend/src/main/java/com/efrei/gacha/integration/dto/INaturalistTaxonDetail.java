package com.efrei.gacha.integration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record INaturalistTaxonDetail(
        Long id, @JsonProperty("wikipedia_summary") String wikipediaSummary) {}
