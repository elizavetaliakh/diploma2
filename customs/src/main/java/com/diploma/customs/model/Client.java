package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "clientIdGen")
    @SequenceGenerator(name = "clientIdGen", sequenceName = "client_id_sequence", allocationSize = 1)
    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "client_full_name")
    private String clientFullName;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "client_phone_number")
    private String clientPhoneNumber;

    @Column(name = "client_email")
    private String clientEmail;

    @Column(name = "passport_number")
    private String passportNumber;

    @Override
    public boolean equals(Object o) {
        if (this.clientId == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return Objects.equals(clientId, client.clientId) && Objects.equals(clientFullName, client.clientFullName) &&
                Objects.equals(birthDate, client.birthDate) && Objects.equals(clientPhoneNumber, client.clientPhoneNumber) &&
                Objects.equals(clientEmail, client.clientEmail) && Objects.equals(passportNumber,client.passportNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, clientFullName, birthDate, clientPhoneNumber, clientEmail,
                passportNumber);
    }
}
