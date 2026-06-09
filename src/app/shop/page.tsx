import { supabase } from "@/src/lib/supabase";
import ShopClient from "./ShopClient";

export type Shop = {
  id: string;
  shop_name: string;
  cover_image_url: string;
  region: string;
  price_range: number;
  source_url: string;
  created_at: string;
};

export default async function ShopPage() {
  const { data, error } = await supabase.from("shops").select("*");

  if (error) {
    console.error("shops fetch error:", error.message);
  }

  return <ShopClient brands={(data ?? []) as Shop[]} />;
}
