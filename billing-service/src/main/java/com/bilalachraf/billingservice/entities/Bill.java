package com.bilalachraf.billingservice.entities;

import com.bilalachraf.billingservice.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
@Entity
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date billingDate;
    @OneToMany(mappedBy = "bill",cascade = CascadeType.ALL)
    private Collection<ProductItem> productItems;
    private Long customerID;
    @Transient
    private Customer customer;

}
