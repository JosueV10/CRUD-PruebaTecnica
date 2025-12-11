package com.crud.dto;

public class PolizasDTO {

    private Integer idEmpleado;
    private Long sku;
    private Integer cantidad;

    public PolizasDTO() {}

    // GETTERS Y SETTERS

    public Integer getIdEmpleado() { return idEmpleado; }
    public void setIdEmpleado(Integer idEmpleado) { this.idEmpleado = idEmpleado; }

    public Long getSku() { return sku; }
    public void setSku(Long sku) { this.sku = sku; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    
}
