package jnezdzom.gamedle.service;

import jnezdzom.gamedle.model.Game;
import jnezdzom.gamedle.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {
    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game add(Game game) {
        if(game == null)
            return null;

        System.out.println(game.getName());
        return gameRepository.save(game);
    }

    public List<Game> getAll(){
        return gameRepository.findAll();
    }
}
