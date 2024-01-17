package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "operations")
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "operationIdGen")
    @SequenceGenerator(name = "operationIdGen", sequenceName = "operation_id_sequence", allocationSize = 1)
    @Column(name = "operation_id")
    private Long operationId;

    @Column(name = "to_mail_message_id")
    private int toMailMessageId;

    @Column(name = "custom")
    private String custom;

    @Column(name = "pto")
    private String pto;

    @Column(name = "lnp_photography")
    private String lnpPhotography;

    @Column(name = "lnp_inspection")
    private String lnpInspection;

    @Column(name = "lnp_custom")
    private String lnpCustom;

    @Column(name = "lnp_warehouse")
    private String lnpWarehouse;

    @Column(name = "date_photography")
    private LocalDate datePhotography;

    @Column(name = "date_inspection")
    private LocalDate dateInspection;

    @Column(name = "date_custom")
    private LocalDate dateCustom;

    @Column(name = "date_warehouse")
    private LocalDate dateWarehouse;

    @Column(name = "good_description")
    private String goodDescription;

    @Column(name = "name_insp")
    private String nameInsp;

    @Column(name = "requirement")
    private String requirement;

    @Column(name = "sign_passport")
    private int signPassport;

    @Column(name = "sign_passport_detail")
    private String signPassportDetail;

    @Column(name = "date_send")
    private LocalDate dateSend;

    @Column(name = "sign_auto_release")
    private int signAutoRelease;

    @Column(name = "sign_risk")
    private int signRisk;

    @Column(name = "insp_cost")
    private float inspCost;

    @Column(name = "insp_currency_code")
    private String inspCurrencyCode;

    @Column(name = "insp_full_name")
    private String inspFullName;

    @Column(name = "status")
    private String status;

    @Column(name = "status_text")
    private String statusText;

    @Column(name = "sign_medical")
    private int signMedical;

    @Column(name = "sugn_medical_comment")
    private String signMedicalComment;

    @Column(name = "release_weight")
    private float releaseWeight;

    @Column(name = "release_note")
    private String releaseNote;

    @Column(name = "refuse_cause")
    private String refuseCause;

    @Column(name = "refuse_note")
    private String refuseNote;

    @Column(name = "detencion_cause")
    private String detencionCause;

    @Column(name = "detencion_note")
    private String detencionNote;

    @Column(name = "detencion_code")
    private String detencionCode;

    @Column(name = "insp_corrected")
    private int inspCorrected;

    @Column(name = "to_send")
    private int toSend;

    @Column(name = "sign_risk_detail")
    private String signRiskDetail;

    @Column(name = "sign_req")
    private int signReq;

    @Column(name = "insp_weight_mail")
    private float inspWeightMail;

    @Column(name = "insp_total_cost_eur")
    private float inspTotalCostEur;
}
