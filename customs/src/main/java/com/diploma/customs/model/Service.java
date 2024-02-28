package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "serviceIdGen")
    @SequenceGenerator(name = "serviceIdGen", sequenceName = "service_id_sequence", allocationSize = 1)
    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "service_name")
    private Long serviceName;

    @Column(name = "service_price")
    private Long servicePrice;

    @Column(name = "product_type")
    private Long productType;

    @Column(name = "service_description")
    private Long serviceDescription;
}
