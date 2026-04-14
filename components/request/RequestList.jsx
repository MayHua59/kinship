import RequestCard from "./RequestCard";
import { requests } from "@/data/requests";

export default function RequestList() {
  return (
    <div>
      {requests.map((req) => (
        <RequestCard key={req.id} request={req} />
      ))}
    </div>
  );
}

