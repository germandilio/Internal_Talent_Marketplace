package ru.germandilio.backendrestapi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.germandilio.backendrestapi.entity.Position;

@RepositoryRestResource(collectionResourceRel = "positions", path = "positions")
public interface PositionRepository extends JpaRepository<Position, Long> {
}

