import { supabase } from "@/src/lib/supabase";
import DressClient from "./DressClient";

export type Dress = {
  id: string;
  image_url: string;
  silhouette: string;
  material: string;
};

export default async function DressPage() {
  const { data, error } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material")
    .order("created_at", { ascending: true });

  if (error) console.error("dresses fetch error:", error.message);

  return <DressClient dresses={(data ?? []) as Dress[]} />;
}
