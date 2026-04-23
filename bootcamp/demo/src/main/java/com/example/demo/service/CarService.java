package com.example.demo.service;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepositoy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepositoy carRepository;

    public CarService(CarRepositoy carRepositoy) {
        this.carRepository = carRepositoy;
    }

    public List<Car> findByPlaca(String placa) {
        return carRepository.findByPlaca(placa)
                .map(List::of)
                .orElseGet(List::of);
    }

    public Car create(Car car) {
        return carRepository.save(car);
    }

    public Car update(Long id, Car carUpdate) {
        Car car = carRepository.findById(id)
                .orElseThrow(() ->  new RuntimeException("Car not found"));
        car.setMarca(carUpdate.getMarca());
        car.setModelo(carUpdate.getModelo());
        car.setAno(carUpdate.getAno());
        car.setPlaca(carUpdate.getPlaca());

        return carRepository.save(car);
    }

    public void delete(Long id){
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        carRepository.delete(car);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }
}
