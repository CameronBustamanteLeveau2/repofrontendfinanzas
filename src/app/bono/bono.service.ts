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

    const cokPeriodo = tasaEfectivaPeriodo;

    const costesInicialesEmisor = bono.estructuracion + bono.colocacion + bono.flotacion + bono.cavali;
    const costesInicialesBonista = bono.prima;

    const precioActual = bono.valorComercial;
    const utilidad = bono.valorComercial - bono.valorNominal;

    const duracion = 1.69;
    const convexidad = 3.71;
    const duracionModificada = duracion / (1 + tasaEfectivaPeriodo);

    const tabla = [];
    let saldo = bono.valorNominal;
    const cuotaAmort = bono.valorNominal / totalPeriodos;

    for (let i = 1; i <= totalPeriodos; i++) {
      const fecha = new Date(bono.fechaEmision as Date);
      fecha.setMonth(fecha.getMonth() + i * (12 / periodosPorAnio));

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
        prima: bono.prima,
        escudo,
        flujoEmisor: cuotaAmort + cupon,
        flujoEmisorEscudo: cuotaAmort + cupon - escudo,
        flujoBonista: cuotaAmort + cupon + bono.prima,
        flujoActualizado: 0,
        faPlazo: i,
        factorP: 1 / Math.pow(1 + tasaEfectivaPeriodo, i)
      });
        saldo += cupon;
      }
      if (i > bono.plazoGraciaParcial && i <= bono.plazoGraciaTotal+bono.plazoGraciaParcial ){
        tabla.push({
          fechaProgramada: fecha,
          inflacionAnual: bono.inflacionAnual,
          inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
          plazoGracia: "P",
          bonoIndexado: saldo,
          cupon,
          cuotaAmortizacion: cuotaAmort,
          prima: bono.prima,
          escudo,
          flujoEmisor: cuotaAmort + cupon,
          flujoEmisorEscudo: cuotaAmort + cupon - escudo,
          flujoBonista: cuotaAmort + cupon + bono.prima,
          flujoActualizado: 0,
          faPlazo: i,
          factorP: 1 / Math.pow(1 + tasaEfectivaPeriodo, i)
        });
      }else {
        tabla.push({
          fechaProgramada: fecha,
          inflacionAnual: bono.inflacionAnual,
          inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
          plazoGracia: "S",
          bonoIndexado: saldo,
          cupon,
          cuotaAmortizacion: cuotaAmort,
          prima: bono.prima,
          escudo,
          flujoEmisor: cuotaAmort + cupon,
          flujoEmisorEscudo: cuotaAmort + cupon - escudo,
          flujoBonista: cuotaAmort + cupon + bono.prima,
          flujoActualizado: 0,
          faPlazo: i,
          factorP: 1 / Math.pow(1 + tasaEfectivaPeriodo, i)
        });
        saldo -= cuotaAmort;
      }

    }

    return {
      estructura: {
        frecuenciaCupon,
        diasCapitalizacion,
        periodosPorAnio,
        totalPeriodos,
        tasaEfectivaAnual,
        tasaEfectivaSemestral,
        cokSemestral: tasaEfectivaSemestral,
        costesInicialesEmisor,
        costesInicialesBonista
      },
      precioActual: { precioActual, utilidad },
      ratios: { duracion, convexidad, duracionModificada },
      tabla
    };
  }
}
