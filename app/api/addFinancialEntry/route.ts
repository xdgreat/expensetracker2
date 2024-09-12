import addData from "@/lib/addData";
import getData, { FinancialData, FinancialEntry } from "@/lib/getData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { name, amount, date, description, type } = req;

    const data: FinancialData = await getData();

    const requestData: FinancialEntry = {
      entryName: name,
      amount: Number.parseInt(amount),
      date,
      description,
      entryType: type,
    };

    data.log.push(requestData);

    await addData(data);

    console.log(data.log);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("ERROR: " + error);
    return NextResponse.json({ status: 500 });
  }
}
