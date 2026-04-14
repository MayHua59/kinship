import GuideCard from "./GuideCard";
import { guides } from "@/data/guide";

export default function GuideList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
}

