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
public class OperationDto {
    private Long id;
    private int toMailMessageId;
    private String custom;
    private String pto;
    private String lnpPhotography;
    private String lnpInspection;
    private String lnpCustom;
    private String lnpWarehouse;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate datePhotography;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateInspection;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateCustom;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateWarehouse;
    private String goodDescription;
    private String nameInsp;
    private String requirement;
    private int signPassport;
    private String signPassportDetail;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateSend;
    private int signAutoRelease;
    private int signRisk;
    private float inspCost;
    private String inspCurrencyCode;
    private String inspFullName;
    private String status;
    private String statusText;
    private int signMedical;
    private String signMedicalComment;
    private float releaseWeight;
    private String releaseNote;
    private String refuseCause;
    private String refuseNote;
    private String detencionCause;
    private String detencionNote;
    private String detencionCode;
    private int inspCorrected;
    private int toSend;
    private String signRiskDetail;
    private int signReq;
    private float inspWeightMail;
    private float inspTotalCostEur;
}
