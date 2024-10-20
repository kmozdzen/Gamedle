package jnezdzom.gamedle.service;

import jnezdzom.gamedle.exception.ResourceNotFoundException;
import jnezdzom.gamedle.gameCheck.GameCheck;
import jnezdzom.gamedle.model.Game;
import jnezdzom.gamedle.model.Genre;
import jnezdzom.gamedle.model.Platform;
import jnezdzom.gamedle.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class GameService {
    private GameRepository gameRepository;
    private Game cachedGame;
    private LocalDate lastUpdateDate;

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
        List<Game> games = gameRepository.findAll();
        for (Game game: games) {
            game.setCode(null);
        }
        return games;
    }

    public Game get(int id) {
        Game game = gameRepository.findById(id)
                .orElse(null);
        game.setCode(null);
        return game;
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
            if(game.getPlatforms() != null)
                gameToUpdate.setPlatforms(game.getPlatforms());
            if(game.getGenres() != null)
                gameToUpdate.setGenres(game.getGenres());
            if(game.getPublisher() != null)
                gameToUpdate.setPublisher(game.getPublisher());
        }else
            return null;

        return gameRepository.save(gameToUpdate);
    }

    @Scheduled(cron = "0 0 0 * * *") // Uruchom codziennie o północy
    public void updateRandomRecord() {
        long count = gameRepository.count();
        int randomIndex = new Random().nextInt((int) count);
        cachedGame = gameRepository.findAll().get(randomIndex);
        cachedGame.setCode(UUID.randomUUID().toString());
        gameRepository.save(cachedGame);
        lastUpdateDate = LocalDate.now();
    }

    public String getRandom() {
        if (cachedGame == null || !lastUpdateDate.equals(LocalDate.now())) {
            updateRandomRecord(); // Upewnij się, że mamy aktualny rekord
        }
        return cachedGame.getCode();
    }

    public GameCheck checkRandom(int id) {
        GameCheck gameCheck = new GameCheck();
        Game game = gameRepository.findById(id).orElse(null);
        Game gameToGuess = gameRepository.findByCode(getRandom());

        if (game != null && gameToGuess != null) { // Sprawdzamy, czy obie gry istnieją
            gameCheck.setName(game.getName().equals(gameToGuess.getName()));
            gameCheck.setYear(game.getYear() == gameToGuess.getYear());

            // Porównywanie list gatunków
            gameCheck.setGenre(areGenresEqual(game.getGenres(), gameToGuess.getGenres()));

            // Porównywanie list platform
            gameCheck.setPlatform(arePlatformsEqual(game.getPlatforms(), gameToGuess.getPlatforms()));

            gameCheck.setPublisher(game.getPublisher().equals(gameToGuess.getPublisher()));
        }

        return gameCheck;
    }

    // Metoda do porównywania gatunków
    private boolean areGenresEqual(List<Genre> genres1, List<Genre> genres2) {
        if (genres1.size() != genres2.size()) {
            return false;
        }
        for (int i = 0; i < genres1.size(); i++) {
            if (!genres1.get(i).getName().equals(genres2.get(i).getName())) {
                return false;
            }
        }
        return true;
    }

    // Metoda do porównywania platform
    private boolean arePlatformsEqual(List<Platform> platforms1, List<Platform> platforms2) {
        if (platforms1.size() != platforms2.size()) {
            return false;
        }
        for (int i = 0; i < platforms1.size(); i++) {
            if (!platforms1.get(i).getName().equals(platforms2.get(i).getName())) {
                return false;
            }
        }
        return true;
    }

}