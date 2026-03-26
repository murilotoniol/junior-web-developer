package com.murilo.Estrutura.Spring.montadora.api;

import com.murilo.Estrutura.Spring.montadora.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carros")
public class TesteFabricaController {

    //@Qualifier("motorTurbo")
    @Autowired
    @Eletrico
    private Motor motor;

    @PostMapping
    public CarroStatus ligarCarro(@RequestBody Chave chave){
       var carro = new HondaCivic(motor);
       return carro.ignicao(chave);
    }
}
