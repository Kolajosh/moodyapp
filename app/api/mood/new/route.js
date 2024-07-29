import { connectToDB } from "@utils/database";
import Moods from "@models/moods";

export const POST = async (req) => {
  const { userId, mood, emotion, emotionIconUnicode, note, timeStamp } = await req.json();

  try {
    await connectToDB();

    const newMood = new Moods({ creator: userId, mood, emotion, emotionIconUnicode, note, timeStamp });
    await newMood.save();

    return new Response(JSON.stringify(newMood), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Something went wrong, try again later" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
