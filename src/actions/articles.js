import { supabase } from "../actions/supabase";

export async function getArticles(
  page = 1, // starting at 1
  perPage = 10,
  orderBy = "date",
  orderDir = "desc" // "asc" | "desc"
) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  console.log(`Fetching articles ${from}-${to}`);
  const result = await supabase
    .from("articles")
    .select("*", { count: "estimated" })
    .range(from, to)
    .order(orderBy, { ascending: orderDir === "asc" });
  const { data, error, count } = result;
  if (error) {
    console.log("Error fetching articles:", error.message);
    throw new Error(`Error fetching articles: ${error.message}`);
  }
  console.log("Fetched articles:", { data, count });
  return { data, count };
}
