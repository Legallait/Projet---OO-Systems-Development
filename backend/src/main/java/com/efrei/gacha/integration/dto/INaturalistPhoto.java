package com.efrei.gacha.integration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record INaturalistPhoto(
        @JsonProperty("medium_url") String mediumUrl,
        String attribution
) {
}