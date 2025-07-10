import { Injectable } from '@angular/core';
import { Bono } from './bono.model';

@Injectable({ providedIn: 'root' })
export class BonoService {
  calcularDatos(bono: Bono) {
    const frecuenciaCupon = bono.frecuenciaCupon; // en días, por ejemplo 180
    const periodosPorAnio = bono.capitalizacion; // por ejemplo 6 si es bimestral
    const totalPeriodos = bono.numeroAnios * periodosPorAnio;
    const diasCapitalizacion = bono.diasPorAnio / bono.capitalizacion;

    // Tasa efectiva anual y por período
    const tasaEfectivaAnual = bono.tasaInteresAnual / 100;
    const tasaEfectivaPeriodo = Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAnio) - 1;

    // Tasa efectiva semestral según frecuencia del cupón
    const tasaEfectivaSemestral = Math.pow(1 + tasaEfectivaPeriodo, frecuenciaCupon / diasCapitalizacion) - 1;

    const cokPeriodo = Math.pow(1+bono.tasaDescuentoAnual/100,bono.frecuenciaCupon/ bono.diasPorAnio) - 1;

    const costesInicialesEmisor = (bono.estructuracion + bono.colocacion + bono.flotacion + bono.cavali)/100;
    const costesInicialesBonista = bono.prima/100;

    const precioActual = bono.valorComercial;
    const utilidad = bono.valorComercial - bono.valorNominal;
    let sumFlujoAct = 0;
    let sumFlujoPlazo = 0;
    let sumFactorP = 0;

    const tabla = [];
    let saldo = bono.valorNominal;
    let cuotaAmort = 0;
    let saldoParaAmortizar = 0;

    for (let i = 1; i <= totalPeriodos; i++) {
      const fecha = new Date(bono.fechaEmision as Date);
      fecha.setMonth(fecha.getMonth() + i * (12 / periodosPorAnio));
      if(i == bono.plazoGraciaParcial + bono.plazoGraciaTotal + 1){
        saldoParaAmortizar = saldo;
        cuotaAmort = saldoParaAmortizar / (totalPeriodos-i+1);
      }
      const prima = i === totalPeriodos ? bono.prima/100 * saldo : 0;
      const cupon = saldo * tasaEfectivaPeriodo;
      const escudo = cupon * bono.impuestoRenta / 100;
      if (i <= bono.plazoGraciaTotal){
      tabla.push({
        fechaProgramada: fecha,
        inflacionAnual: bono.inflacionAnual,
        inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
        plazoGracia: "T",
        bonoIndexado: saldo,
        cupon,
        cuotaAmortizacion: cuotaAmort,
        prima: prima,
        escudo,
        flujoEmisor: cuotaAmort + cupon + prima,
        flujoEmisorEscudo: cuotaAmort + cupon - escudo,
        flujoBonista: cuotaAmort + cupon + prima,
        flujoActualizado: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i),
        faPlazo: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*bono.frecuenciaCupon/bono.diasPorAnio,
        factorP: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*(1+i)
      });
        saldo += cupon;
      }
      if (i > bono.plazoGraciaTotal && i <= (bono.plazoGraciaTotal+bono.plazoGraciaParcial) ){
        tabla.push({
          fechaProgramada: fecha,
          inflacionAnual: bono.inflacionAnual,
          inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
          plazoGracia: "P",
          bonoIndexado: saldo,
          cupon,
          cuotaAmortizacion: cuotaAmort,
          prima: prima,
          escudo,
          flujoEmisor: cuotaAmort + cupon + prima,
          flujoEmisorEscudo: cuotaAmort + cupon - escudo,
          flujoBonista: cuotaAmort + cupon + prima,
          flujoActualizado: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i),
          faPlazo: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*bono.frecuenciaCupon/bono.diasPorAnio,
          factorP: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*(1+i)
        });
        //saldoAlFinalDelPeriodoDeGracia = saldo;
      }
      if (i > bono.plazoGraciaParcial+bono.plazoGraciaTotal) {
        tabla.push({
          fechaProgramada: fecha,
          inflacionAnual: bono.inflacionAnual,
          inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
          plazoGracia: "S",
          bonoIndexado: saldo,
          cupon,
          cuotaAmortizacion: cuotaAmort,
          prima: prima,
          escudo,
          flujoEmisor: cuotaAmort + cupon + prima,
          flujoEmisorEscudo: cuotaAmort + cupon - escudo,
          flujoBonista: cuotaAmort + cupon + prima,
          flujoActualizado: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i),
          faPlazo: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*bono.frecuenciaCupon/bono.diasPorAnio,
          factorP: (cuotaAmort + cupon + prima)/ Math.pow(1+ cokPeriodo,i)*i*(1+i)
        });
        saldo -= cuotaAmort;
      }
        sumFlujoAct += (cuotaAmort + cupon + prima) / Math.pow(1 + cokPeriodo, i);
        sumFlujoPlazo += (cuotaAmort + cupon + prima) * i * bono.frecuenciaCupon * bono.diasPorAnio;
        sumFactorP += (cuotaAmort + cupon + prima) / Math.pow(1 + cokPeriodo, i) * i * (1 + i);

    }

    const duracion = sumFlujoPlazo/sumFlujoAct;
    const convexidad = sumFactorP/Math.pow(1+ cokPeriodo,2)*sumFlujoAct*Math.pow(bono.diasPorAnio/bono.frecuenciaCupon,2);
    const duracionModificada = duracion / (1 + tasaEfectivaPeriodo);


    return {
      estructura: {
        frecuenciaCupon,
        diasCapitalizacion,
        periodosPorAnio,
        totalPeriodos,
        tasaEfectivaAnual,
        tasaEfectivaSemestral,
        cokPeriodo: cokPeriodo,
        costesInicialesEmisor,
        costesInicialesBonista
      },
      precioActual: { precioActual, utilidad },
      ratios: { duracion, convexidad, duracionModificada },
      tabla
    };
  }
}
