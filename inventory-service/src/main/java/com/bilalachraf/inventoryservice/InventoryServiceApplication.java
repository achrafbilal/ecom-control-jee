package com.bilalachraf.inventoryservice;

import com.bilalachraf.inventoryservice.entities.Product;
import com.bilalachraf.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Random;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration repositoryRestConfiguration) {
		repositoryRestConfiguration.exposeIdsFor(Product.class);
		return args -> {

			productRepository.save(new Product(null,"Product 1",1500D,200));
			productRepository.save(new Product(null,"Product 2",3000D,500));
			productRepository.save(new Product(null,"Product 3",900000D,50));
		};
	}

}
