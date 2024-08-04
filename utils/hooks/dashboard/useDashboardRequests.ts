import { useState } from "react";
import useApiRequest from "../useApiRequest";
import useSnackBar from "@components/reusables/SnackBar";

interface UserMoodEntry {
  userId: string;
  emotionIconUnicode: string;
  note: string;
  mood: string;
  emotion: string;
  timeStamp: string;
}

const useDashboardRequests = () => {
  const { SnackBar } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [createMoodResponse, setCreateMoodResponse] = useState<any>([]);
  const [err, setErr] = useState<any>(null);
  const makeRequest = useApiRequest();

  // get all moods
  const getAllMoods = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get("mood");
      if (res) {
        setResponse(res);
      }
    } catch (error: any) {
      setErr(error);
      SnackBar({
        type: "error",
        message: error.message,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  // add a new mood
  const addNewMood = async (datapayload: UserMoodEntry) => {
    try {
      setLoading(true);
      const res = await makeRequest.post(
        "mood/new",
        JSON.stringify({ ...datapayload })
      );
      
      if (res) {
        setCreateMoodResponse(res);
        SnackBar({
          type: "success",
          message: "Mood Added successfully",
          position: "top-right",
        });
        getAllMoods();
      }
    } catch (error: any) {
      setErr(error);
      SnackBar({
        type: "error",
        message: error.message,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    addNewMood,
    createMoodResponse,
    getAllMoods,
    response,
    err,
    loading,
  };
};

export default useDashboardRequests;
