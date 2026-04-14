package com.bootcamp.bootcamp.repository;

import com.bootcamp.bootcamp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
