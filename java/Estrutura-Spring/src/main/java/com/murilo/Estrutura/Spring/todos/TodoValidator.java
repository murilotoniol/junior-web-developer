package com.murilo.Estrutura.Spring.todos;

import org.springframework.stereotype.Component;

@Component
public class TodoValidator {

    private TodoRepository repository;

    public TodoValidator(TodoRepository repository) {
        this.repository = repository;
    }

    public void validar(TodoEntity todo){
        if(existeTodoDesc(todo.getDescricao())){
            throw new RuntimeException("Ja existe um todo com essa descrição");
        }
    }

    public boolean existeTodoDesc(String descricao){
        return repository.existsByDescricao(descricao);
    }
}
