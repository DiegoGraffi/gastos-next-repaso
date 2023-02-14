import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("gastos-repaso")
      .delete()
      .neq("id", 0);
    res.status(200).send("Borraste todo manyin");
  } else {
    res.status(200).send("No borraste nada");
  }
}
