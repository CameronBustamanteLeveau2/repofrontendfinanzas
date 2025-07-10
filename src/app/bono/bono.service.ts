import { Injectable } from '@angular/core';
import { Bono } from './bono.model';

@Injectable({ providedIn: 'root' })
export class BonoService {
  calcularDatos(bono: Bono) {
    const frecuenciaCupon = bono.frecuenciaCupon; // en días (ej: 180)
    const periodosPorAnio = bono.capitalizacion; // ej: 6 si es bimestral
    const totalPeriodos = bono.numeroAnios * periodosPorAnio;
    const diasCapitalizacion = bono.diasPorAnio / bono.capitalizacion;

    // Tasa efectiva anual y por período
    const tasaEfectivaAnual = bono.tasaInteresAnual / 100;
    const tasaEfectivaPeriodo = Math.pow(1 + tasaEfectivaAnual, 1 / periodosPorAnio) - 1;

    // Tasa efectiva según frecuencia de cupón
    const tasaEfectivaSemestral = Math.pow(1 + tasaEfectivaPeriodo, frecuenciaCupon / diasCapitalizacion) - 1;

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

      const prima = i === totalPeriodos ? bono.prima * saldo : 0;

      // Determinar tipo de plazo de gracia
      let plazoGracia = "S"; // Sin gracia por defecto
      if (i <= bono.plazoGraciaTotal) {
        plazoGracia = "T"; // Total
      } else if (i > bono.plazoGraciaParcial && i <= bono.plazoGraciaTotal + bono.plazoGraciaParcial) {
        plazoGracia = "P"; // Parcial
      }

      tabla.push({
        fechaProgramada: fecha,
        inflacionAnual: bono.inflacionAnual,
        inflacionBimestral: bono.inflacionAnual / bono.capitalizacion,
        plazoGracia: plazoGracia,
        bonoIndexado: saldo,
        cupon: cupon,
        cuotaAmortizacion: cuotaAmort,
        prima: prima,
        escudo: escudo,
        flujoEmisor: cuotaAmort + cupon,
        flujoEmisorEscudo: cuotaAmort + cupon - escudo,
        flujoBonista: cuotaAmort + cupon + prima,
        flujoActualizado: 0,
        faPlazo: i,
        factorP: 1 / Math.pow(1 + tasaEfectivaPeriodo, i)
      });

      // Actualizar saldo
      if (plazoGracia === "S") {
        saldo -= cuotaAmort;
      } else if (plazoGracia === "T") {
        saldo += cupon;
      }
      // Para Parcial puedes personalizar reglas si aplica
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
