package com.bilalachraf.main;

import com.bilalachraf.main.entities.Customer;
import com.bilalachraf.main.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration repositoryRestConfiguration)
	{
		repositoryRestConfiguration.exposeIdsFor(Customer.class);
		return args -> {
			customerRepository.save(new Customer(null,"customer 1","customer-1@mail.com"));
			customerRepository.save(new Customer(null,"customer 2","customer-2@mail.com"));
			customerRepository.save(new Customer(null,"customer 3","customer-3@mail.com"));
		};
	}

}
