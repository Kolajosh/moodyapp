import { connectToDB } from "@utils/database";
import Moods from "@models/moods";

export const GET = async (req) => {
  try {
    await connectToDB();

    const moods = await Moods.find({}).populate("creator");
    return new Response(JSON.stringify(moods, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response("Failed to get moods", { status: 500 });
  }
};
