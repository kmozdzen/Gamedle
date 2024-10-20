package jnezdzom.gamedle.gameCheck;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class GameCheck {

    public GameCheck() {

    }

    public boolean isName() {
        return name;
    }

    public void setName(boolean name) {
        this.name = name;
    }

    public boolean isYear() {
        return year;
    }

    public void setYear(boolean year) {
        this.year = year;
    }

    public boolean isGenre() {
        return genre;
    }

    public void setGenre(boolean genre) {
        this.genre = genre;
    }

    public boolean isPlatform() {
        return platform;
    }

    public void setPlatform(boolean platform) {
        this.platform = platform;
    }

    public boolean isPublisher() {
        return publisher;
    }

    public void setPublisher(boolean publisher) {
        this.publisher = publisher;
    }

    public GameCheck(boolean name, boolean year, boolean genre, boolean platform, boolean publisher) {
        this.name = name;
        this.year = year;
        this.genre = genre;
        this.platform = platform;
        this.publisher = publisher;
    }

    boolean name;
    boolean year;
    boolean genre;
    boolean platform;
    boolean publisher;
}
