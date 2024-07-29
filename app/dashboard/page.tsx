import Dashboard from "@components/views/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Moodboard",
  description: "Mood",
};

export default function HomePage() {
  return <Dashboard />;
}
