package com.example.libraryapi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;
//import javax.persistence.Entity

@Entity
@Table(name="autor", schema="public")
@Getter
@Setter
public class Autor {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="nome", length = 100, nullable = false)
    private String nome;

    @Column(name="data_nascimento", nullable = false)
    private Date dataNascimento;

    @Column(name="nacionalidade", length=50, nullable = false)
    private String nacionalidade;


}