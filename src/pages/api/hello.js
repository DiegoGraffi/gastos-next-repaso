// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const { data, error } = await supabase.from("gastos-repaso").select();
      console.log(data);
      res.status(200).json(data);
      break;
    }
    case "POST": {
      const gasto = req.body;
      const { data, error } = await supabase
        .from("gastos-repaso")
        .insert({
          nombre: gasto.nombre,
          cantidad: gasto.cantidad,
          categoria: gasto.categoria,
        })
        .select();

      if (error !== null) {
        console.log(error);
        res.status(400).send(error.message);
      } else {
        res.status(200).json(data[0]);
      }
      break;
    }
    case "DELETE": {
      const id = req.query.id;
      const { error } = await supabase
        .from("gastos-repaso")
        .delete()
        .eq("id", id);
      res.status(200).json({ message: "Borrado exitosamente" });
      break;
    }

    default:
      res.status(200).json({ message: "metodo no soportado" });
  }
}
