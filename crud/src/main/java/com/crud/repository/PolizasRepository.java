package com.crud.repository;
import com.crud.model.Polizas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolizasRepository extends JpaRepository<Polizas, Integer> {


}
