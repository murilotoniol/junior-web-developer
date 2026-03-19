package com.murilo.Estrutura.Spring.montadora;

import java.awt.*;

public class HondaCivic extends Carro{

    public HondaCivic(Motor motor) {
        super(motor);
        setModelo("Civic");
        setCor(Color.black);
        setMontadora(Montadora.HONDA);
        setMotor(new Motor());
    }


}
