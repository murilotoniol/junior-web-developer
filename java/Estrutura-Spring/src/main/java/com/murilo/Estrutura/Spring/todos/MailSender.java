package com.murilo.Estrutura.Spring.todos;

import org.springframework.stereotype.Component;

@Component
public class MailSender {

    public void enviar(String mensagem){
        System.out.println("Enviado email: "+mensagem);
    }
}
