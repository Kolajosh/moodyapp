import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ToastNotify } from "./ToastNotify";
import SnackBar from "./SnackBar";

const ChartComponent = ({ formattedData }) => {
  // Extract unique moods
  const moodNames = formattedData?.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (key !== "name" && key !== "amount" && !acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

  // Aggregate data by date and mood
  const aggregatedDataByDate = formattedData?.reduce((acc, curr) => {
    const date = curr.name; // Assuming 'name' field is the date
    if (!acc[date]) {
      acc[date] = {};
      moodNames.forEach((mood) => {
        acc[date][mood] = 0;
      });
    }
    moodNames.forEach((mood) => {
      if (curr[mood]) {
        acc[date][mood] += curr[mood];
      }
    });
    return acc;
  }, {});

  // Aggregate total data for all dates
  const aggregatedTotalData = formattedData?.reduce((acc, curr) => {
    moodNames.forEach((mood) => {
      if (curr[mood]) {
        if (!acc[mood]) {
          acc[mood] = 0;
        }
        acc[mood] += curr[mood];
      }
    });
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(null); // Initialize with the first date
  const [pieChartData, setPieChartData] = useState(null); // Initialize with the first date

  const totalPieChartData = Object.keys(aggregatedTotalData)?.map((mood) => ({
    mood: mood,
    count: aggregatedTotalData[mood],
  }));

  useEffect(() => {
    setSelectedDate(Object.keys(aggregatedDataByDate)[0]);
  }, []);

  // Prepare data for the selected date
  useEffect(() => {
    if (selectedDate) {
      setPieChartData(
        Object.keys(aggregatedDataByDate[selectedDate])?.map((mood) => ({
          mood: mood,
          count: aggregatedDataByDate[selectedDate][mood],
        }))
      );
    }
  }, [selectedDate]);

  const moodColors = {
    sad: "#86469C", // Purple
    good: "#2C7865", // MediumPurple
    hehe: "#FA7070", // DarkMagenta
    excited: "#FB9AD1", // DarkOrchid
    bad: "#A34343", // BlueViolet
    meh: "#9400D3", // DarkViolet
    goofy: "#453F78", // SlateBlue
    rad: "#FF5733", // Reddish
  };

  const colors = pieChartData?.map((entry) => moodColors[entry.mood]);
  const totalColors = totalPieChartData?.map((entry) => moodColors[entry.mood]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const action = (snackbarId) => (
    <>
      <button
        onClick={() => {
          alert(`I belong to snackbar with id ${snackbarId}`);
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </button>
    </>
  );

  const renderCustomLabel = ({ x, y, name }) => {
    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {name}
      </text>
    );
  };

  return (
    <div className="p-5 w-full border rounded-xl">
      <div className="flex items-center justify-around">
        <div>
          <div className="mb-3">
            <span>
              {selectedDate ? "Viewing data for: " : "Select your date"}
            </span>
            <select
              className="p-1 border ml-3 rounded-lg"
              onChange={handleDateChange}
              value={selectedDate}
            >
              {Object.keys(aggregatedDataByDate).map((date) => (
                <option key={date} value={date}>
                  {dayjs(date).format("MMMM D, YYYY")}
                </option>
              ))}
            </select>
          </div>
          {!pieChartData || pieChartData?.length < 1 ? (
            <div>No records found for {selectedDate}</div>
          ) : (
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                dataKey="count"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={renderCustomLabel}
              >
                {pieChartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${entry?.mood}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
        <div>
          <div className="mb-3">Total Summary for the last 7 Days</div>
          {!totalPieChartData || pieChartData < 1 ? (
            <div>Summary not available</div>
          ) : (
            <PieChart width={400} height={400}>
              <Pie
                data={totalPieChartData}
                dataKey="count"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={renderCustomLabel}
              >
                {totalPieChartData?.map((entry, index) => (
                  <Cell
                    key={`cell-total-${entry?.mood}`}
                    fill={totalColors[index % totalColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
      </div>
      {/* <SnackBar message="This is a test message" type="success" /> */}
    </div>
  );
};

export default ChartComponent;
