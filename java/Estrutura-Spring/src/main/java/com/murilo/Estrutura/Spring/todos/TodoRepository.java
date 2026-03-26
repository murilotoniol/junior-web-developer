package com.murilo.Estrutura.Spring.todos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Integer> {
    boolean existsByDescricao(String descricao);  // essas linhas fazem exatamente a mesma coisa
    TodoEntity findByDescricao(String descricao); // essas linhas fazem exatamente a mesma coisa
}
