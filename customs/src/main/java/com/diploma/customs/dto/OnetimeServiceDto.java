package com.diploma.customs.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OnetimeServiceDto {
    private Long onetimeServiceId;
    private Long serviceId;
    private Long clientId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate acceptionDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate deadlineDate;
    private String responsibleEmployee;
}
