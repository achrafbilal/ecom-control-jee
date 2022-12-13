package com.bilalachraf.billingservice;

import com.bilalachraf.billingservice.entities.Bill;
import com.bilalachraf.billingservice.entities.ProductItem;
import com.bilalachraf.billingservice.feign.CustomerRestClient;
import com.bilalachraf.billingservice.feign.ProductRestClient;
import com.bilalachraf.billingservice.model.Customer;
import com.bilalachraf.billingservice.model.Product;
import com.bilalachraf.billingservice.repositories.BillRepository;
import com.bilalachraf.billingservice.repositories.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.hateoas.PagedModel;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Stream;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}
	/*@Bean
	CommandLineRunner start(
			BillRepository billRepository,
			ProductItemRepository productItemRepository,
			CustomerRestClient customerRestClient,
			ProductRestClient productRestClient,
			RepositoryRestConfiguration repositoryRestConfiguration
	) {
		return args -> {
			repositoryRestConfiguration.exposeIdsFor(Bill.class);
			PagedModel<Product> products=productRestClient.getPageProducts(0,10);
			for (int i = 1; i < 4; i++) {
				Customer customer=customerRestClient.getCustomerById((long) i);
				Bill b=billRepository.save(
					new Bill(
						null,
						new Date(),
						null,
						customer.getId(),
						null
					)
				);
				products.forEach(
					p->{
						ProductItem pi= new ProductItem(
							null,
							p.getQuantity(),
							p.getId(),
							p.getPrice(),
							b,
							null
						);
						productItemRepository.save(pi);
					}
				);
			}
		};
	}*/
}
