package com.document.management.exception;

import com.document.management.dto.ApiError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /* ---------------- COMMON BUILDER ---------------- */

    private ResponseEntity<ApiError> buildError(
            HttpStatus status,
            String message,
            Object details) {

        ApiError error = ApiError.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .details(details)
                .build();

        return new ResponseEntity<>(error, status);
    }

    /* ---------------- VALIDATION ---------------- */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex) {

        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        DefaultMessageSourceResolvable::getDefaultMessage,
                        (a, b) -> a
                ));

        return buildError(
                HttpStatus.BAD_REQUEST,
                "Validation failed",
                errors
        );
    }

    /* ---------------- DATA INTEGRITY ---------------- */

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrity(DataIntegrityViolationException ex) {

        log.warn("Data integrity violation", ex);

        if (ex.getMessage() != null && ex.getMessage().contains("users_email_key")) {
            return buildError(
                    HttpStatus.CONFLICT,
                    "Email already registered",
                    null
            );
        }

        return buildError(
                HttpStatus.BAD_REQUEST,
                "Invalid data provided",
                null
        );
    }

    /* ---------------- BUSINESS / SECURITY ---------------- */

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiError> handleForbidden(ForbiddenException ex) {
        return buildError(
                HttpStatus.FORBIDDEN,
                ex.getMessage(),
                null
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDenied(AccessDeniedException ex) {
        return buildError(
                HttpStatus.FORBIDDEN,
                "Access denied",
                null
        );
    }

    /* ---------------- MULTIPART ---------------- */

    @ExceptionHandler({ MaxUploadSizeExceededException.class, MultipartException.class })
    public ResponseEntity<ApiError> handleMultipart(Exception ex) {

        log.warn("Multipart error", ex);

        return buildError(
                HttpStatus.BAD_REQUEST,
                "File too large or invalid multipart request",
                null
        );
    }

    /* ---------------- RESPONSE STATUS ---------------- */

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiError> handleResponseStatus(ResponseStatusException ex) {

        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());

        return buildError(
                status,
                ex.getReason() != null ? ex.getReason() : status.getReasonPhrase(),
                null
        );
    }

    /* ---------------- RUNTIME EXCEPTION (IMPORTANT) ---------------- */

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntime(RuntimeException ex) {

        log.error("Unhandled RuntimeException", ex);

        return buildError(
                HttpStatus.BAD_REQUEST,
                ex.getMessage(),
                null
        );
    }

    /* ---------------- FALLBACK ---------------- */

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnknown(Exception ex) {

        log.error("Unhandled exception", ex);

        return buildError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error",
                null
        );
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiError> handleNoResource(NoResourceFoundException ex) {
        return buildError(
                HttpStatus.NOT_FOUND,
                "Not Found",
                "Resource not found"
        );
    }
}

