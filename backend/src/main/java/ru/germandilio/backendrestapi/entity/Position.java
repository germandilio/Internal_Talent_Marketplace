package ru.germandilio.backendrestapi.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "empl_position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "position", cascade = CascadeType.ALL)
    private Set<Employee> employees;

    public Position() {
    }

    public Position(String description) {
        this.description = description;
    }
}
