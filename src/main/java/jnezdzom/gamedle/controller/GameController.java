package jnezdzom.gamedle.controller;

import jnezdzom.gamedle.gameCheck.GameCheck;
import jnezdzom.gamedle.model.Game;
import jnezdzom.gamedle.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/games")
@CrossOrigin(origins = "https://gamedle-khaki.vercel.app")
public class GameController{
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    List<Game> getAll(){
        return gameService.getAll();
    }

    @GetMapping("/{id}")
    Game get(@PathVariable int id){
        return gameService.get(id);
    }

    @PostMapping("/")
    Game add(@RequestBody Game game){
        return gameService.add(game);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable int id){
         gameService.delete(id);
    }

    @PutMapping("/{id}")
    Game update(@PathVariable int id, @RequestBody Game game){
        return gameService.update(id, game);
    }

    @GetMapping("/random")
    String getRandom() {
        return gameService.getRandom();
    }

    @GetMapping("/check-random/{id}")
    GameCheck checkRandom(@PathVariable int id) {
        return gameService.checkRandom(id);
    }

}
