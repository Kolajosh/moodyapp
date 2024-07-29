import Analytics from "@components/views/Analytics/Analytics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Moodboard",
  description: "Mood",
};

export default function HomePage() {
  return <Analytics />;
}
