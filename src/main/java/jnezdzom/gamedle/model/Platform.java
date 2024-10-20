package jnezdzom.gamedle.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
@Table(name = "platform")
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPlatform;

    @Column
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "platforms", fetch = FetchType.EAGER)
    private List<Game> games;
}
