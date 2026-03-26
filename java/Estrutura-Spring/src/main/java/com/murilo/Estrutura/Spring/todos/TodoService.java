package com.murilo.Estrutura.Spring.todos;

import org.springframework.stereotype.Service;

@Service
public class TodoService {

    private TodoRepository todoRepository;
    private TodoValidator todoValidator;
    private MailSender mailSender;

    public TodoService(TodoRepository todoRepository, TodoValidator todoValidator, MailSender mailSender){
        this.todoRepository = todoRepository;
        this.mailSender = mailSender;
        this.todoValidator = todoValidator;
    }

    public TodoEntity salvar(TodoEntity novoTodo){
        todoValidator.validar(novoTodo);
        return todoRepository.save(novoTodo);
    }

    public void atualizarStatus(TodoEntity todo){
        todoRepository.save(todo);
        mailSender.enviar("Todo atualizado: "+todo.getDescricao());
    }

    public TodoEntity buscarPorId(Integer id){
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Nao existe Todo com esse id"));
    }
}
