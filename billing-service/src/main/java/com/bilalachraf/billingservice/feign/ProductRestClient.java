package com.bilalachraf.billingservice.feign;

import com.bilalachraf.billingservice.model.Customer;
import com.bilalachraf.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.QueryParam;
import java.util.Collection;

@FeignClient(name = "INVENTORY-SERVICE")
public interface ProductRestClient {

    @GetMapping("/products/{id}")
    Product getProductById(@RequestHeader("Authorization") String token, @PathVariable Long id);


    @GetMapping("/products")
    PagedModel<Product> getPageProducts(
            @RequestHeader("Authorization") String token,
            @RequestParam(value="page") int page,
            @RequestParam(value="size") int size
            );

    @PutMapping("/products/{id}")
    Product updateProduct(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody Product product);
}
