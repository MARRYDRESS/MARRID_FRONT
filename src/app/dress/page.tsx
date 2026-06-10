import { supabase } from "@/src/lib/supabase";
import DressClient from "./DressClient";

export type Dress = {
  id: string;
  image_url: string;
  silhouette: string;
  material: string;
  shop_name: string;
  price_range: number | null;
};

export default async function DressPage() {
  const [{ data: dresses, error: dressErr }, { data: shops, error: shopErr }] =
    await Promise.all([
      supabase.from("dresses").select("id, image_url, silhouette, material, shop_id").order("created_at"),
      supabase.from("shops").select("id, shop_name, price_range"),
    ]);

  if (dressErr) console.error("dresses error:", dressErr.message);
  if (shopErr) console.error("dresse error:", shopErr.message);

  const shopMap = new Map((shops ?? []).map((s) => [s.id, s]));

  const merged: Dress[] = (dresses ?? []).map((d) => {
    const shop = shopMap.get(d.shop_id);
    return {
      id: d.id,
      image_url: d.image_url,
      silhouette: d.silhouette ?? "",
      material: d.material ?? "",
      shop_name: shop?.shop_name ?? "",
      price_range: shop?.price_range ?? null,
    };
  });

  return <DressClient dresses={merged} />;
}
