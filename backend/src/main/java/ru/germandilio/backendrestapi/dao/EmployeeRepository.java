package ru.germandilio.backendrestapi.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;
import ru.germandilio.backendrestapi.entity.Employee;

import java.util.Collection;

@RepositoryRestResource(path = "employees", collectionResourceRel = "employees")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Page<Employee> findByPositionId(@RequestParam("id") Long id, Pageable pageable);

    Page<Employee> findByPositionIdIn(@RequestParam("id") Collection<Long> id, Pageable pageable);

    @Query(value = "SELECT * FROM internal_talent_marketplace.public.employees AS employee WHERE CONCAT(replace(employee.first_name, ' ', ''), replace(employee.last_name, ' ', '')) ILIKE CONCAT('%', replace(:value, ' ', '%'), '%')",
            nativeQuery = true)
    Page<Employee> findByFIOContaining(@RequestParam("search") String value, Pageable pageable);

    @Query(value = "SELECT * FROM internal_talent_marketplace.public.employees AS employee WHERE employee.position_id IN :id AND CONCAT(replace(employee.first_name, ' ', ''), replace(employee.last_name, ' ', '')) ILIKE CONCAT('%', replace(:value, ' ', '%'), '%')",
            nativeQuery = true)
    Page<Employee> findByPositionIdInAndFIOContaining(@RequestParam("search") String value, @RequestParam("id") Collection<Long> id, Pageable pageable);
}
