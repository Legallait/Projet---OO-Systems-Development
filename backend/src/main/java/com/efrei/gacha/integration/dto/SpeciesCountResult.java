package com.efrei.gacha.integration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SpeciesCountResult(Integer count, INaturalistTaxon taxon) {}
