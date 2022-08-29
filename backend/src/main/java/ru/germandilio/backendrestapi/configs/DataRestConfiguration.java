package ru.germandilio.backendrestapi.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import ru.germandilio.backendrestapi.entity.Employee;
import ru.germandilio.backendrestapi.entity.Position;

import javax.persistence.EntityManager;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {
    private String[] allowedOrigins;

    @Value("${cors.allowed.origins}")
    public void setAllowedOrigins(String[] allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        var unsupportedMethods = new HttpMethod[] {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        config.getExposureConfiguration()
                .forDomainType(Employee.class)
                .withItemExposure((matadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((matadata, httpMethods) -> httpMethods.disable(unsupportedMethods));

        config.getExposureConfiguration()
                .forDomainType(Position.class)
                .withItemExposure((matadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((matadata, httpMethods) -> httpMethods.disable(unsupportedMethods));

        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);

        config.exposeIdsFor(Employee.class);
    }
}
