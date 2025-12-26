package com.document.management.dto;

import com.document.management.model.Status;

import java.time.Instant;

public record DocumentMetadata(Long id, String filename, String contentType, Long size, Instant uploadedAt, String uploadedBy,
                               Status status) {}
