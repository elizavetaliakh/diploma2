package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "onetime_service")
public class OnetimeService {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "onetimeServiceIdGen")
    @SequenceGenerator(name = "onetimeServiceIdGen", sequenceName = "onetime_service_id_sequence", allocationSize = 1)
    @Column(name = "onetime_service_id")
    private Long onetimeServiceId;

    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "acception_date")
    private LocalDate acceptionDate;

    @Column(name = "deadline_date")
    private LocalDate deadlineDate;

    @Column(name = "responsible_employee")
    private String responsibleEmployee;
}
