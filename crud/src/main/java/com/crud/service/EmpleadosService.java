package com.crud.service;

import com.crud.model.Empleados;
import com.crud.repository.EmpleadosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadosService {

    private final EmpleadosRepository repo;

    public EmpleadosService(EmpleadosRepository repo) {
        this.repo = repo;
    }

    public List<Empleados> getAll() {
        return repo.findAll();
    }

    public Empleados getById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public boolean exists(Integer id) {
        if (id == null) {
            return false;
        }
        return repo.existsById(id);
    }

    public Empleados save(Empleados emp) {
        return repo.save(emp);
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }
}

