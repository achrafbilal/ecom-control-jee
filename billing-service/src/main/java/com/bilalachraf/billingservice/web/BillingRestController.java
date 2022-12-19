package com.bilalachraf.billingservice.web;

import com.bilalachraf.billingservice.entities.Bill;
import com.bilalachraf.billingservice.entities.ProductItem;
import com.bilalachraf.billingservice.feign.CustomerRestClient;
import com.bilalachraf.billingservice.feign.ProductRestClient;
import com.bilalachraf.billingservice.model.Customer;
import com.bilalachraf.billingservice.model.Product;
import com.bilalachraf.billingservice.repositories.BillRepository;
import com.bilalachraf.billingservice.repositories.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;


@RestController
@RequestMapping("/fullBill")
public class BillingRestController {
    @Autowired
    BillRepository billRepository;
    @Autowired
    ProductItemRepository productItemRepository;
    @Autowired
    ProductRestClient productRestClient;
    @Autowired
    CustomerRestClient customerRestClient;
    @GetMapping("/{id}")
    public Bill getBillById(@RequestHeader("Authorization") String token,@PathVariable Long id)
    {
        Optional<Bill> optionalBill=billRepository.findById(id);
        if(!optionalBill.isPresent())
            return null;
        Bill b=optionalBill.get();
        Customer c=customerRestClient.getCustomerById(token,b.getCustomerID());
        b.setCustomer(c);
        b.getProductItems().forEach(p->
            p.setProduct(productRestClient.getProductById(token,p.getProductID()))
        );
        return b;
    }

    @GetMapping("")
    public Page<Bill> getAllBills(@RequestHeader("Authorization") String token,@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "20") Integer size)
    {
        System.out.println("Authorization : "+token);

        Pageable pageable=PageRequest.of(page,size);
        Page<Bill> billsPage=billRepository.findAll(pageable);
        for (Bill b:billsPage.toList()) {
            Customer c=customerRestClient.getCustomerById(token,b.getCustomerID());
            b.setCustomer(c);
            b.getProductItems().forEach(p->
                p.setProduct(productRestClient.getProductById(token,p.getProductID()))
            );
        }
        return billsPage;
    }

    @GetMapping("/customer/{id}")
    public Page<Bill> getBillByCustomerId(@RequestHeader("Authorization") String token,@PathVariable Long id,@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "20") Integer size)
    {
        Page<Bill> billsPage=billRepository.findByCustomerID(id,PageRequest.of(page,size));
        System.out.println(billsPage.getTotalElements());
        for (Bill b:billsPage.toList()) {
            Customer c=customerRestClient.getCustomerById(token,b.getCustomerID());
            b.setCustomer(c);
            b.getProductItems().forEach(p->
                p.setProduct(productRestClient.getProductById(token,p.getProductID()))
            );

        }
        return billsPage;
    }

    @PostMapping("")
    public Bill addBill(@RequestHeader("Authorization") String token,@RequestBody Bill bill) {
        for (ProductItem prI:bill.getProductItems()) {
            System.out.println(prI.getQuantity()+" x "+prI.getPrice());
            Product product=productRestClient.getProductById(token,prI.getProductID());
            if(product!=null){
                if(product.getQuantity()-prI.getQuantity()>=0)
                {
                    product.setQuantity(product.getQuantity()-prI.getQuantity());
                    Product p=productRestClient.updateProduct(token,product.getId(),product);
                    System.out.println(p.getQuantity());
                }
                else throw new RuntimeException("The ordered quantity is not affordable");
            }
            else throw  new RuntimeException("Product with id "+prI.getProductID()+" not found");

        }


        Bill savedBill=this.billRepository.save(bill);
        Collection<ProductItem> savedProductItems=new ArrayList<>();
        for (ProductItem item:bill.getProductItems()) {
            item.setBill(savedBill);
            savedProductItems.add( this.productItemRepository.save(item));
        }
        savedBill.setProductItems(savedProductItems);
        return savedBill;
    }
    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id)
    {
        billRepository.deleteById(id);
    }

}
