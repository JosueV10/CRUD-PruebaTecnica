package com.crud.service;

import org.springframework.stereotype.Service;
import com.crud.repository.InventarioRepository;
import com.crud.model.Inventario;

import java.util.List;

@Service
public class InventarioService {

    private final InventarioRepository repo;

    public InventarioService(InventarioRepository repo) {
        this.repo = repo;
    }

    public List<Inventario> getAll() {
        return repo.findAll();
    }

    public Inventario getBySku(Long sku) {
        return repo.findById(sku).orElse(null);
    }

    public Inventario save(Inventario inv) {
        return repo.save(inv);
    }

    public void delete(Long sku) {
        repo.deleteById(sku);
    }

    public boolean exists(Long sku) {
        return repo.existsById(sku);
    }
}
