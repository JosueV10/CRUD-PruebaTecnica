package com.crud.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

import com.crud.dto.ApiResponse;

@ControllerAdvice
public class ApiExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleNotFound(ResourceNotFoundException ex) {
        ApiResponse body = new ApiResponse(Map.of("Status","ERROR"), Map.of("Mensaje", Map.of("IDMensaje", ex.getMessage())));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(InsufficientInventoryException.class)
    public ResponseEntity<ApiResponse> handleInsufficient(InsufficientInventoryException ex) {
        ApiResponse body = new ApiResponse(Map.of("Status","ERROR"), Map.of("Mensaje", Map.of("IDMensaje", ex.getMessage())));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneral(Exception ex) {
        ApiResponse body = new ApiResponse(Map.of("Status","ERROR"), Map.of("Mensaje", Map.of("IDMensaje", ex.getMessage())));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

}
