package com.murilo.Estrutura.Spring.montadora.configuration;

import com.murilo.Estrutura.Spring.montadora.Motor;
import com.murilo.Estrutura.Spring.montadora.TipoMotor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MontadoraConfiguration {

    @Bean(name = "motorAspirado")
    public Motor motorAspirado(){
        var motor = new Motor();
        motor.setCavalos(140);
        motor.setCilindros(6);
        motor.setLitragem(2.0);
        motor.setModelo("Civic");
        motor.setTipo(TipoMotor.ASPIRADO);
        return motor;
    }

    @Bean(name = "motorEletrico")
    public Motor motorEletrico(){
        var motorEletrico = new Motor();
        motorEletrico.setModelo("TH-40");
        motorEletrico.setLitragem(1.4);
        motorEletrico.setCilindros(3);
        motorEletrico.setCavalos(180);
        motorEletrico.setTipo(TipoMotor.ELETRICO);
        return motorEletrico;
    }

    @Bean(name = "motorTurbo")
    public Motor motorTurbo(){
        var motorTurbo = new Motor();
        motorTurbo.setTipo(TipoMotor.TURBO);
        motorTurbo.setCavalos(320);
        motorTurbo.setCilindros(6);
        motorTurbo.setModelo("Biribim");
        motorTurbo.setLitragem(2.0);
        return motorTurbo;
    }
}
