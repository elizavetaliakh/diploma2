package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "serviceIdGen")
    @SequenceGenerator(name = "serviceIdGen", sequenceName = "service_id_sequence", allocationSize = 1)
    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "service_price")
    private Float servicePrice;

    @Column(name = "product_type")
    private String productType;

    @Column(name = "service_description")
    private String serviceDescription;
}
