import googleTrends from "google-trends-api";
import { useRouter } from "next/router";

async function handler(req, res) {
  const { query: { term } } = req;

  if (term) {
    const trends = await googleTrends.interestOverTime({ keyword: term });

    res.json(trends);
  } else {
    res.json({ err: "Missing term" });
  }
}

export default handler
