package com.document.management.dto;

import java.time.Instant;

public record DocumentMetadata(Long id, String filename, String contentType, Long size, Instant uploadedAt, Long uploadedBy) {}
