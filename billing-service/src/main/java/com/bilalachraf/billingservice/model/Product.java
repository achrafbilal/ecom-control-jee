package com.bilalachraf.billingservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class Product {
    private Long id;
    private String name;
    private Double price;
    private Integer quantity;
}
