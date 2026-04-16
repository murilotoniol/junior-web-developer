package com.example.produtosapi.service;

import com.example.produtosapi.model.Produto;
import com.example.produtosapi.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto salvar(Produto produto){
        produtoRepository.save(produto);
        return produto;
    }

    public Produto findById(String id){
        return produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public void deleteById(String id){
        produtoRepository.deleteById(id);
    }

    public List<Produto> buscarNome(String nome){
        return produtoRepository.findByNome(nome);
    }
}
