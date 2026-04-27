package com.example.produtosapi.web;

import com.example.produtosapi.model.Produto;
import com.example.produtosapi.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("produtos")
public class ProdutoController {

    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public Produto salvar(@RequestBody Produto produto){
        return produtoService.salvar(produto);
    }

    @GetMapping("/{id}")
    public Produto obterPorId(@PathVariable("id") String id){
        return produtoService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deletarPorId(@PathVariable("id") String id){
        produtoService.deleteById(id);
    }

    @PutMapping("/{id}") // passar um ID, com esse ID vou procurar o produto e caso eu encontre eu tenho que sobreescrever as info dele com as novas passada na URL
    public Produto atualizar(@PathVariable("id") String id,
                             @RequestBody Produto produto){

        Produto existente = produtoService.findById(id);

        existente.setNome(produto.getNome());
        existente.setDescricao(produto.getDescricao());
        existente.setPreco(produto.getPreco());

        return produtoService.salvar(existente);
    }

    @GetMapping                     //usado para query url
    public List<Produto> buscarNome(@RequestParam("nome") String nome){
        return produtoService.buscarNome(nome);
    }

}
