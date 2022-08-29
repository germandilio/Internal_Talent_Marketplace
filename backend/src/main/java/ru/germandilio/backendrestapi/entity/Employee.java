package ru.germandilio.backendrestapi.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name ="phone_number")
    private long phoneNumber;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "position_id", nullable = false)
    private Position position;

    @Column(name = "cv_link")
    private String cvLink;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name = "date_hired")
    private Date dateHired;

    @Column(name = "active")
    private boolean active;

    @Column(name = "sex")
    private String sex;

    @Column(name = "grade")
    private String grade;

    public Employee() {
    }

    public Employee(String firstName, String lastName, long phoneNumber, String email, Position position, String cvLink, String imageURL, Date dateHired, boolean active, String sex, String grade) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.position = position;
        this.cvLink = cvLink;
        this.imageURL = imageURL;
        this.dateHired = dateHired;
        this.active = active;
        this.sex = sex;
        this.grade = grade;
    }

    public String getImageURL() {
        if  (imageURL == null) {
            return "/assets/images/placeholder_" + sex + ".jpeg";
        }
        return imageURL;
    }

    public String getPositionName() {
        if (position == null) return "";
        return position.getDescription();
    }
}
