package com.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
// import jakarta.persistence.Version;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;

@Entity
public class Empleados {

    @Id

    private Integer idEmpleado;

    private String nombre;
    private String apellido;
    private String puesto;

 

    public Integer getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(Integer idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }
}
