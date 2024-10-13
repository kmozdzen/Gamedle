package jnezdzom.gamedle.controller;

import jnezdzom.gamedle.model.Game;
import jnezdzom.gamedle.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/games")
public class GameController{
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    List<Game> getAll(){
        return gameService.getAll();
    }

    @PostMapping("/")
    Game add(@RequestBody Game game){
        return gameService.add(game);
    }
}
