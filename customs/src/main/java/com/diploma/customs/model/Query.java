package com.diploma.customs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "queries")
public class Query {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queryIdGen")
    @SequenceGenerator(name = "queryIdGen", sequenceName = "query_id_seq", allocationSize = 1)
    @Column(name = "query_id")
    private Long queryId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "query_definition")
    private String queryDefinition;

    @Override
    public boolean equals(Object o) {
        if (this.userId == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Query query = (Query) o;
        return Objects.equals(queryId, query.queryId) && Objects.equals(userId, query.userId) && Objects.equals(queryDefinition, query.queryDefinition);
    }

    @Override
    public int hashCode() {
        return Objects.hash(queryId, userId, queryDefinition);
    }
}
