package com.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Inventario")
public class Inventario {
    
    @Id
    private Long SKU;
    private String nombre;
    private Integer cantidad;


    public Inventario() {}

    // GETTERS Y SETTERS

    public Long getSku() { return SKU; }
    public void setSku(Long SKU) { this.SKU = SKU; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    
}
