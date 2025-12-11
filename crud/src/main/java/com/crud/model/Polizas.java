package com.crud.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Polizas")
public class Polizas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPolizas;

    @ManyToOne
    @JoinColumn(name = "empleado_genero", nullable = false)
    private Empleados empleadoGenero; // Hace referencia al empleado

    @ManyToOne
    @JoinColumn( name = "SKU", nullable = false)
    private Inventario articulo; // Hace referencia al inventario 

    @Column( nullable = false)
    private Integer cantidad;

    @Column( nullable =  false)
    private LocalDateTime fecha = LocalDateTime.now();

    public Polizas() {} 
    
    // GETTERS Y SETTERS

    public Integer getIdPolizas() { return idPolizas; }
    
    public Empleados getEmpleadoGenero() { return empleadoGenero; }
    public void setEmpleadoGenero( Empleados empleadoGenero ) { this.empleadoGenero = empleadoGenero; }

    public Inventario getArticulo() { return articulo; }
    public void setArticulo(Inventario articulo) { this.articulo = articulo; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad ) { this.cantidad = cantidad; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha( LocalDateTime fecha ) { this.fecha = fecha; }

}
