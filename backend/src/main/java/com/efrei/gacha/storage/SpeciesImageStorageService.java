package com.efrei.gacha.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class SpeciesImageStorageService {

    private static final Logger log = LoggerFactory.getLogger(SpeciesImageStorageService.class);

    private final RestClient restClient;
    private final Path storageDirectory;

    public SpeciesImageStorageService(@Value("${app.images.storage-path:./species-images}") String storagePath) {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5_000);
        requestFactory.setReadTimeout(10_000);

        this.restClient = RestClient.builder()
                .requestFactory(requestFactory)
                .build();
        this.storageDirectory = Path.of(storagePath);
    }

    public String downloadAndStore(Long taxonId, String remoteImageUrl) {
        try {
            Files.createDirectories(storageDirectory);

            byte[] imageBytes = restClient.get()
                    .uri(remoteImageUrl)
                    .retrieve()
                    .body(byte[].class);

            String filename = taxonId + "." + extractExtension(remoteImageUrl);
            Files.write(storageDirectory.resolve(filename), imageBytes);

            return "/species-images/" + filename;
        } catch (IOException | RuntimeException e) {
            log.warn("Telechargement image echoue pour le taxon {} : {}", taxonId, e.getMessage());
            return remoteImageUrl;
        }
    }

    private String extractExtension(String url) {
        String path = url.substring(url.lastIndexOf('/') + 1);
        int dotIndex = path.lastIndexOf('.');
        return dotIndex >= 0 ? path.substring(dotIndex + 1) : "jpg";
    }
}