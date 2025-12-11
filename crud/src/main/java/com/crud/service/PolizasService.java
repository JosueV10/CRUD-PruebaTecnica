package com.crud.service;

import java.util.List;

import com.crud.model.Empleados;
import com.crud.model.Polizas;
import com.crud.model.Inventario;

import org.springframework.stereotype.Service;

import com.crud.exception.InsufficientInventoryException;
import com.crud.exception.ResourceNotFoundException;
import com.crud.repository.EmpleadosRepository;
import com.crud.repository.InventarioRepository;
import com.crud.repository.PolizasRepository;

import jakarta.transaction.Transactional;



@Service
public class PolizasService {

    private final PolizasRepository repo;
    private final InventarioRepository inventarioRepo;
    private final EmpleadosRepository empleadosRepo;

    public PolizasService(PolizasRepository repo, InventarioRepository inventarioRepo, EmpleadosRepository empleadosRepo) {

        this.repo = repo;
        this.inventarioRepo = inventarioRepo;
        this.empleadosRepo = empleadosRepo;
    }

    public List<Polizas> getAll() { 
        return repo.findAll(); 
    }

    public Polizas getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Poliza no encontrada id: " + id));
    }

    @Transactional
    public Polizas create(Integer id_empleado, Long SKU, Integer cantidad ) {
        Empleados empleado = empleadosRepo.findById(id_empleado)
            .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado: " + id_empleado));
        Inventario articulo = inventarioRepo.findById(SKU)
            .orElseThrow(() -> new ResourceNotFoundException("Articulo no encontrado: " + SKU));

        if (articulo.getCantidad() < cantidad) {
            throw new InsufficientInventoryException("Inventario insuficiente para : " + SKU);
        }

    

    // restar inventario
    articulo.setCantidad(articulo.getCantidad() - cantidad);
    inventarioRepo.save(articulo);

    Polizas p = new Polizas();
    p.setEmpleadoGenero(empleado);
    p.setArticulo(articulo);
    p.setCantidad(cantidad);
    // la fecha se inicia en la entidad

    return repo.save(p);

    }

    @Transactional
    public Polizas update(Integer id, Integer nuevoEmpleadoId, Long nuevoSku, Integer nuevaCantidad) {

        Polizas poliza = getById(id);

        // devolver cantidad anterior al inventario anterior
        Inventario articuloAnterior = poliza.getArticulo();
        articuloAnterior.setCantidad(articuloAnterior.getCantidad() + poliza.getCantidad());
        inventarioRepo.save(articuloAnterior);

        // validar nuevos datos
        Empleados nuevoEmpleado = empleadosRepo.findById(nuevoEmpleadoId)
            .orElseThrow(() -> new ResourceNotFoundException("Empleado nuevo no encontrado"));

        Inventario nuevoArticulo = inventarioRepo.findById(nuevoSku)
            .orElseThrow(() -> new ResourceNotFoundException("Articulo nuevo no encontrado"));

        if (nuevoArticulo.getCantidad() < nuevaCantidad) {
            throw new InsufficientInventoryException("Inventario insuficiente");
        }
        

        // restar del nuevo articulo
        nuevoArticulo.setCantidad( nuevoArticulo.getCantidad() - nuevaCantidad);
        inventarioRepo.save(nuevoArticulo);

        poliza.setEmpleadoGenero(nuevoEmpleado);
        poliza.setArticulo(nuevoArticulo);
        poliza.setCantidad(nuevaCantidad);
        poliza.setFecha(java.time.LocalDateTime.now());

        return repo.save(poliza);
    }

    @Transactional
    public void delete(Integer id) {
        Polizas poliza = getById(id);

        Inventario articulo = poliza.getArticulo();
        articulo.setCantidad(articulo.getCantidad() + poliza.getCantidad());
        inventarioRepo.save(articulo);

        repo.delete(poliza);
        
    }
}

