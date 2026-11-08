const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzJwGQWmbA-33P2UH75q9AkdivnjcpkVg5lzIyIABPd4PZmusae0KGPBASQRAv5KoCbEM3mXkIi9_J/pub?gid=91339212&single=true&output=csv";

export default async () => {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_CSV_URL}&v=${Date.now()}`, {
      headers: { "User-Agent": "BOFO-UNHCR-Menu/1.0" }
    });
    if (!response.ok) throw new Error(`Google Sheets a répondu ${response.status}`);

    return new Response(await response.text(), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=300",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return Response.json(
      { error: "Le menu Google Sheets est temporairement inaccessible." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
};
