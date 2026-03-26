package com.murilo.Estrutura.Spring.todos;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("todos")
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public TodoEntity salvar(@RequestBody TodoEntity todo){
        try {
            return this.todoService.salvar(todo);
        }catch (RuntimeException e){
            var mensagemErro = e.getMessage();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, mensagemErro);
        }
    }

    @PutMapping("{id}")
    public void atualizar(@PathVariable("id") Integer id, @RequestBody TodoEntity todo){
        todo.setId(id);

        todoService.atualizarStatus(todo);
    }

    @GetMapping("{id}")
    public TodoEntity buscar(@PathVariable("id") Integer id){
        return todoService.buscarPorId(id);
    }
}
