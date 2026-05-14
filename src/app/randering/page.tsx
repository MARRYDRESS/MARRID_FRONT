import RanderingClient from "./randeringClient";

type RanderingPageProps = {
  searchParams?: Promise<{ intent?: string }>;
};

export default async function RanderingPage({
  searchParams,
}: RanderingPageProps) {
  const params = searchParams != null ? await searchParams : {};
  const isFitting = params.intent === "fitting";
  return <RanderingClient isFitting={isFitting} />;
}
