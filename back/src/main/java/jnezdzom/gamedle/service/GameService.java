package jnezdzom.gamedle.service;

import jnezdzom.gamedle.exception.ResourceNotFoundException;
import jnezdzom.gamedle.model.Game;
import jnezdzom.gamedle.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game add(Game game) {
        if (game == null)
            return null;

        System.out.println(game.getName());
        return gameRepository.save(game);
    }

    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    public Game get(int id) {
        return gameRepository.findById(id)
                .orElse(null);
    }

    public void delete(int id) {
        Game game = gameRepository.findById(id).orElse(null);
        if(game != null){
            gameRepository.delete(game);
            System.out.println("Game id: " + id + " deleted");
        }
    }

    public Game update(int id, Game game) {
        if (game == null)
            return null;

        Game gameToUpdate = gameRepository.findById(id)
                .orElse(null);

        if(gameToUpdate != null){
            if(game.getName() != null)
                gameToUpdate.setName(game.getName());
            if(game.getYear() != 0)
                gameToUpdate.setYear(game.getYear());
            if(game.getPlatform() != null)
                gameToUpdate.setPlatform(game.getPlatform());
            if(game.getGenre() != null)
                gameToUpdate.setGenre(game.getGenre());
            if(game.getPublisher() != null)
                gameToUpdate.setPublisher(game.getPublisher());
        }else
            return null;

        return gameRepository.save(gameToUpdate);
    }
}