package com.crud.controller;

import com.crud.model.Empleados;
import com.crud.service.EmpleadosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/empleados")
@CrossOrigin("*")
public class EmpleadosController {

    private final EmpleadosService service;

    public EmpleadosController(EmpleadosService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return okResponse("Consulta exitosa", service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Empleados emp = service.getById(id);
        if (emp == null) {
            return errorResponse("No existe el empleado solicitado");
        }
        return okResponse("Consulta exitosa", emp);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Empleados empleado) {
        if (empleado.getIdEmpleado() == null) {
            return errorResponse("El ID de empleado es obligatorio");
        }

        if (service.exists(empleado.getIdEmpleado())) {
            return errorResponse("El ID de empleado ya existe");
        }

        Empleados saved = service.save(empleado);
        return okResponse("Se creó correctamente el empleado", saved);
    }




    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Empleados empleado) {
        if (!service.exists(id)) {
            return errorResponse("No existe el empleado para actualizar");
        }
        empleado.setIdEmpleado(id);  
        Empleados updated = service.save(empleado);
        return okResponse("Se actualizó correctamente", updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!service.exists(id)) {
            return errorResponse("No existe el empleado para eliminar");
        }
        service.delete(id);
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
