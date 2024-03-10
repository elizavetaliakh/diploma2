package com.diploma.customs.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServicesDto {
    private Long serviceId;
    private String serviceName;
    private Float servicePrice;
    private String productType;
    private String serviceDescription;
}
