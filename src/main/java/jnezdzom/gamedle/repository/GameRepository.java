package jnezdzom.gamedle.repository;

import jnezdzom.gamedle.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<Game, Integer> {
     Game findByCode(String code);
}
