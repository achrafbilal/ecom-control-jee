package com.bilalachraf.inventoryservice.repositories;

import com.bilalachraf.inventoryservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product,Long> {
    @RestResource(path="keyword", rel="keyword")
    Page<Product> findAllByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);
}
