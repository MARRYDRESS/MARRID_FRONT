import { supabase } from "@/src/lib/supabase";
import ShopClient from "./ShopClient";

export type Dresse = {
  id: string;
  shop_name: string;
  source_url: string;
  region: string;
  image_url: string;
  price_range: number;
};

export default async function ShopPage() {
  const { data, error } = await supabase.from("dresses").select("*");

  if (error) {
    console.error("dresse 테이블 조회 실패:", error.message);
  }

  console.log("dresse 데이터:", data, "에러:", error);

  return <ShopClient brands={(data ?? []) as Dresse[]} />;
}
