package com.murilo.Estrutura.Spring.todos;

import org.springframework.stereotype.Service;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    public TodoEntity salvar(TodoEntity novoTodo){
        return todoRepository.save(novoTodo);
    }

    public TodoEntity atualizarStatus(TodoEntity todo){
        return todoRepository.save(todo);
    }

    public TodoEntity buscarPorId(Integer id){
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Nao existe Todo com esse id"));
    }
}
