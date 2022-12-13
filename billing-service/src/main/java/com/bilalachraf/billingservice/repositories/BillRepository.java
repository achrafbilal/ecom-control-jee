package com.bilalachraf.billingservice.repositories;

import com.bilalachraf.billingservice.entities.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;

@RepositoryRestResource
public interface BillRepository extends JpaRepository<Bill,Long> {
    Page<Bill> findByCustomerID(Long customerID, Pageable pageable);

}
