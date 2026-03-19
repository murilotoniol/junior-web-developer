package com.murilo.Estrutura.Spring.montadora.configuration;

import com.murilo.Estrutura.Spring.montadora.Motor;
import com.murilo.Estrutura.Spring.montadora.TipoMotor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MontadoraConfiguration {

    @Bean
    public Motor motor(){
        var motor = new Motor();
        motor.setCavalos(140);
        motor.setCilindros(6);
        motor.setLitragem(2.0);
        motor.setModelo("Civic");
        motor.setTipo(TipoMotor.ASPIRADO);
        return motor;
    }
}
