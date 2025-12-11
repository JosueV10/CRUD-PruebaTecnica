package com.crud.controller;

import java.util.HashMap;
import java.util.Map;

import com.crud.model.Inventario;
import com.crud.service.InventarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventario")
@CrossOrigin("*")
public class InventarioController {

    private final InventarioService service;

    public InventarioController(InventarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return okResponse("Consulta exitosa", service.getAll());
    }

    @GetMapping("/{sku}")
    public ResponseEntity<?> getById(@PathVariable Long sku) {
        Inventario inv = service.getBySku(sku);
        if (inv == null) {
            return errorResponse("No existe el SKU solicitado");
        }
        return okResponse("Consulta exitosa", inv);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Inventario inventario) {
        if (service.exists(inventario.getSku())) {
            return errorResponse("El SKU ya existe");
        }
        Inventario saved = service.save(inventario);
        return okResponse("Se creó correctamente el producto", saved);
    }

    @PutMapping("/{sku}")
    public ResponseEntity<?> update(@PathVariable Long sku, @RequestBody Inventario inventario) {
        if (!service.exists(sku)) {
            return errorResponse("No existe el SKU para actualizar");
        }
        inventario.setSku(sku);
        Inventario updated = service.save(inventario);
        return okResponse("Se actualizó correctamente", updated);
    }

    @DeleteMapping("/{sku}")
    public ResponseEntity<?> delete(@PathVariable Long sku) {
        if (!service.exists(sku)) {
            return errorResponse("No existe el SKU para eliminar");
        }

        service.delete(sku);
        return okResponse("Se eliminó correctamente", null);
    }



    private ResponseEntity<?> okResponse(String mensaje, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("Meta", Map.of("Status", "OK"));
        response.put("Data", Map.of(
                "Mensaje", Map.of("IDMensaje", mensaje),
                "Resultado", data
        ));
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<?> errorResponse(String mensaje) {
        Map<String, Object> response = new HashMap<>();
        response.put("Meta", Map.of("Status", "ERROR"));
        response.put("Data", Map.of(
                "Mensaje", Map.of("IDMensaje", mensaje)
        ));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
