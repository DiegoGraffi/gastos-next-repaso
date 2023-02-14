import { object } from "prop-types";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Filtros from "@/components/Filtros";
import ListadoGastos from "@/components/ListadoGastos";
import Modal from "@/components/Modal";
import { generarId } from "@/helpers";
import IconoNuevoGasto from "@/img/nuevo-gasto.svg";
import Image from "next/image";
import { useLocalStorage } from "@/helpers/hooks";

export default function Home() {
  const [gastos, setGastos] = useState([]);

  const [presupuesto, setPresupuesto] = useLocalStorage("presupuesto", 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const pedirGastos = async () => {
    // pido gastos al api
    const response = await fetch("/api/hello", {
      method: "GET",
    });

    const gastosJson = await response.json();
    setGastos(gastosJson);
  };

  useEffect(() => {
    pedirGastos();
  }, []);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = async (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    const response = await fetch("/api/hello?id=" + id, {
      method: "DELETE",
    });
    setGastos(gastosActualizados);
  };

  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <Image
                src={IconoNuevoGasto}
                alt="Icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )}
      </div>
    </>
  );
}
