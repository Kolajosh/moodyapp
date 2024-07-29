import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const getPreviousWeekDates = () => {
  const today = dayjs();
  const startOfWeek = today.isoWeekday(1); // Monday of this week
  const startOfLastWeek = startOfWeek.subtract(1, 'week');
  const endOfLastWeek = startOfLastWeek.add(6, 'days'); // Sunday of the previous week

  return {
    startOfLastWeek: startOfLastWeek.startOf('day').format('YYYY-MM-DD'),
    endOfLastWeek: endOfLastWeek.endOf('day').format('YYYY-MM-DD'),
  };
};

interface MoodData {
    mood: string;
    emotion: string;
    emotionIconUnicode: string;
    note: string;
    timeStamp: Date;
  }
  
  // Sample data
  const moodData: MoodData[] = [
    // Insert your mood data here
  ];
  
  // Function to organize data for display in a chart
  export const organizeDataForChart = (data: MoodData[]) => {
    // Initialize an empty object to store organized data
    const organizedData: { [key: string]: { [key: string]: number } } = {};
  
    // Loop through each mood entry in the data
    data.forEach((entry) => {
      // Extract the date from the timestamp
      const date = new Date(entry.timeStamp).toLocaleDateString();
  
      // Initialize the mood entry if it doesn't exist in the organized data
      if (!organizedData[entry.mood]) {
        organizedData[entry.mood] = {};
      }
  
      // Increment the count of the mood for the corresponding date
      if (!organizedData[entry.mood][date]) {
        organizedData[entry.mood][date] = 1;
      } else {
        organizedData[entry.mood][date]++;
      }
    });
  
    return organizedData;
  };