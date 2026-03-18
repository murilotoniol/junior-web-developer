package com.example.produtosapi.controller;

import com.example.produtosapi.model.Produto;
import com.example.produtosapi.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("produtos")
public class ProdutoController {

    private ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) { // construtor para injetar o repository do produto
        this.produtoRepository = produtoRepository;
    }

    @PostMapping
    public Produto salvar(@RequestBody Produto produto){
        System.out.println("Produto recebido: "+produto);

        String id = UUID.randomUUID().toString();
        produto.setId(id);

        produtoRepository.save(produto);
        return produto;
    }

    @GetMapping("/{id}")
    public Produto obterPorId(@PathVariable("id") String id){
//        Optional<Produto> produto = produtoRepository.findById(id);    essa linha faz exatamente a mesma coisa da linha  38
//        return produto.isPresent() ? produto.get() : null;

        return produtoRepository.findById(id).orElse(null);
    }
}
