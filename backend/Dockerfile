FROM amazoncorretto:19-alpine3.16

EXPOSE 8443

VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java", "-Djava.secutiry.egd-file:dev/./urandom", "-jar", "/app.jar"]