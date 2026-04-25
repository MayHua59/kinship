"use client";

import GuideCard from "./GuideCard";
import { guides } from "@/data/guide";
import { useEffect, useMemo, useRef, useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function GuideList() {
  const timeoutsRef = useRef(new Map());
  const [statusById, setStatusById] = useState({});
  const [cancelGuideId, setCancelGuideId] = useState(null);

  useEffect(() => {
    return () => {
      for (const t of timeoutsRef.current.values()) {
        clearTimeout(t);
      }
      timeoutsRef.current.clear();
    };
  }, []);

  const recommended = useMemo(() => guides, []);

  function requestChat(guideId) {
    setStatusById((prev) => ({ ...prev, [guideId]: "sending" }));

    const existing = timeoutsRef.current.get(guideId);
    if (existing) clearTimeout(existing);

    const t = setTimeout(() => {
      setStatusById((prev) => ({ ...prev, [guideId]: "pending" }));
      timeoutsRef.current.delete(guideId);
    }, 900);

    timeoutsRef.current.set(guideId, t);
  }

  function cancelRequest(guideId) {
    const existing = timeoutsRef.current.get(guideId);
    if (existing) {
      clearTimeout(existing);
      timeoutsRef.current.delete(guideId);
    }
    setStatusById((prev) => ({ ...prev, [guideId]: "idle" }));
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {recommended.map((guide) => (
          <GuideCard
            key={guide.id}
            guide={guide}
            requestStatus={statusById[guide.id] ?? "idle"}
            onRequest={() => requestChat(guide.id)}
            onCancelClick={() => setCancelGuideId(guide.id)}
          />
        ))}
      </div>

      <ConfirmModal
        open={cancelGuideId != null}
        title="Cancel request?"
        description="This will remove the pending request. You can send it again anytime."
        confirmText="Yes, cancel"
        cancelText="Keep request"
        tone="danger"
        onClose={() => setCancelGuideId(null)}
        onConfirm={() => {
          if (cancelGuideId == null) return;
          cancelRequest(cancelGuideId);
          setCancelGuideId(null);
        }}
      />
    </>
  );
}

