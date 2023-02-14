import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import Image from "next/image";
import { formatearFecha } from "../helpers";
import IconoCasa from "@/img/icono-casa.svg";
import IconoComida from "@/img/icono-comida.svg";
import IconoOcio from "@/img/icono-ocio.svg";
import IconoRopa from "@/img/icono-ropa.svg";
import IconoTransporte from "@/img/icono-transporte.svg";
import IconoViajes from "@/img/icono-viajes.svg";

const diccionarioIconos = {
  casa: IconoCasa,
  comida: IconoComida,
  ocio: IconoOcio,
  ropa: IconoRopa,
  transporte: IconoTransporte,
  viajes: IconoViajes,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <Image
              width={100}
              src={diccionarioIconos[categoria]}
              alt="icono-gasto"
            />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
