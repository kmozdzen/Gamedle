package jnezdzom.gamedle.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idGame;

    @Column
    private String name;

    @Column
    private int year;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "game_genre",
            joinColumns = @JoinColumn(name = "idGame"),
            inverseJoinColumns = @JoinColumn(name = "idGenre")
    )
    private List<Genre> genres;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "game_platform",
            joinColumns = @JoinColumn(name = "idGame"),
            inverseJoinColumns = @JoinColumn(name = "idPlatform")
    )
    private List<Platform> platforms;

    @Column
    private String publisher;

    @Column
    private String code;
}
