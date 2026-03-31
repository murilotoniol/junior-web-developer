package com.example.libraryapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="livro")
@Getter
@Setter
public class Livro {

    @Id
    @Column(name="id", nullable = false)
    private UUID id;

    @Column(name="isbn", nullable = false, length=20)
    private String isbn;

    @Column(name="titulo", nullable = false,length=150)
    private String titulo;

    @Column(name="data_publicacao", nullable = false)
    private Date dataPublicacao;

    @Column(name="genero", nullable = false, length=30)
    private String genero;

    @Column(name="preco")
    private double preco;

    @Column(name="id_autor", nullable = false)
    private UUID idAutor;
}
