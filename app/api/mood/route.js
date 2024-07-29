import { connectToDB } from "@utils/database";
import Moods from "@models/moods";
import dayjs from 'dayjs';

export const GET = async (req) => {
  // Parse URL search parameters for startDate and endDate
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  console.log(searchParams, "date");

  try {
    await connectToDB();

    let moods;
    if (startDate && endDate) {
      // Convert start and end dates to dayjs objects
      const startOfLastWeek = dayjs(startDate);
      const endOfLastWeek = dayjs(endDate);

      // Find moods within the specified date range
      moods = await Moods.find({
        timeStamp: {
          $gte: startOfLastWeek.toDate(), // greater than or equal to start date
          $lte: endOfLastWeek.toDate(), // less than or equal to end date
        },
      }).populate("creator");
    } else {
      // Find all moods if no date range is provided
      moods = await Moods.find({}).populate("creator");
    }

    return new Response(JSON.stringify(moods), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get moods", { status: 500 });
  }
};
