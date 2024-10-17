FROM maven:3.9.8-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21
COPY --from=build /target/gamedle-0.0.1-SNAPSHOT.jar gamedle.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","gamedle.jar"]