package com.bilalachraf.main.repositories;

import com.bilalachraf.main.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface CustomerRepository  extends JpaRepository<Customer,Long> {

    @RestResource(path="keyword", rel="keyword")
    Page<Customer> findAllByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(@Param("name") String name,@Param("email") String email, Pageable pageable);
}
