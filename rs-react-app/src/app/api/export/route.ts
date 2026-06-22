import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const items = await req.json();

  const headers = [
    "Name",
    "Description",
    "Details URL",
  ];

  const rows = items.map(
    (item: {
      name: string;
      description: string;
    }) => [
      item.name,
      item.description,
      `/pokemon/${item.name}`,
    ]
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row: string[]) => row.join(","))
  ].join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${items.length}_items.csv"`
    }
  });
}