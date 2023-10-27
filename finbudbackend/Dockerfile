FROM amazoncorretto:17

WORKDIR /app

COPY target/finbudbackend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8090

CMD ["java", "-Djdk.util.jar.enableMultiRelease=false", "-jar", "app.jar"]
