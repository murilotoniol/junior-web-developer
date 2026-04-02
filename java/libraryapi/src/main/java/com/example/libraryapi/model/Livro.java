package com.example.libraryapi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="livro")
@Data //tras as anotations: getter, setter, toString, EqualsAndHashCode, RequiredArgsConstructor
public class Livro {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @Column(name="isbn", nullable = false, length=20)
    private String isbn;

    @Column(name="titulo", nullable = false,length=150)
    private String titulo;

    @Column(name="data_publicacao", nullable = false)
    private Date dataPublicacao;

    @Enumerated(EnumType.STRING)
    @Column(name="genero", nullable = false, length=30)
    private GeneroLivro genero;

    @Column(name="preco", precision = 18, scale = 2)
    private BigDecimal preco;

    @ManyToOne
    @JoinColumn(name="id_autor", nullable = false)
    private Autor idAutor;
}
