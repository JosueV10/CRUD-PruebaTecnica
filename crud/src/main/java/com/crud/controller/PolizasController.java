package com.crud.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.crud.dto.PolizasDTO;

import com.crud.model.Polizas;
import com.crud.service.PolizasService;

@RestController
@RequestMapping("/polizas")
@CrossOrigin("*")

public class PolizasController {

    private final PolizasService service;

    public PolizasController( PolizasService service) {
        this.service = service;
    }

    @GetMapping
    public List<Polizas>getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Polizas getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Polizas create(@RequestBody PolizasDTO dto) {
        return service.create(dto.getIdEmpleado(), dto.getSku(), dto.getCantidad());
    }

    @PutMapping("/{id}")
    public Polizas update(@PathVariable Integer id, @RequestBody PolizasDTO dto){
        return service.update(id, dto.getIdEmpleado(), dto.getSku(), dto.getCantidad());
    }
    

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    
}
