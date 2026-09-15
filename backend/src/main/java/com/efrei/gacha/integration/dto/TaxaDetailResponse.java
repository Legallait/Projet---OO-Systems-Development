package com.efrei.gacha.integration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TaxaDetailResponse(List<INaturalistTaxonDetail> results) {}