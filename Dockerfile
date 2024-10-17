# Wybierz obraz Maven z kompatybilną wersją JDK
FROM maven:3.9.5-eclipse-temurin-21 AS build

# Skopiuj wszystkie pliki z projektu do obrazu
COPY . .

# Zbuduj aplikację bez uruchamiania testów (można to zmienić)
RUN mvn clean package -DskipTests

# Wybierz obraz OpenJDK dla uruchamiania aplikacji
FROM eclipse-temurin:21-jdk-slim

# Skopiuj wygenerowany plik JAR z etapu build
COPY --from=build /target/gamedle-0.0.1-SNAPSHOT.jar gamedle.jar

# Wystaw port 8080, na którym będzie działać aplikacja
EXPOSE 8080

# Zdefiniuj polecenie startowe aplikacji
ENTRYPOINT ["java", "-jar", "gamedle.jar"]
