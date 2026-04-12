/**
 * Demo thread content keyed by chat id (see data/active-chats.js).
 * `from`: "me" = signed-in user, "peer" = other person.
 */

export const chatThreadsDemo = {
  "chat-may": {
    peerName: "May Thazin",
    peerLabel: "Seeker · Korea studies",
    messages: [
      {
        id: "m1",
        type: "text",
        from: "peer",
        text: "Hi! I’m polishing my personal statement for Seoul National.",
        time: "Mon 9:12",
      },
      {
        id: "m2",
        type: "text",
        from: "me",
        text: "Happy to help. What program are you targeting?",
        time: "Mon 9:15",
      },
      {
        id: "m3",
        type: "image",
        from: "peer",
        imageUrl: "https://picsum.photos/seed/kinmay/640/360",
        imageAlt: "Sketch of essay outline",
        time: "Mon 9:20",
      },
      {
        id: "m4",
        type: "file",
        from: "peer",
        fileName: "essay-draft-v2.docx",
        fileSize: "240 KB",
        time: "Mon 9:21",
      },
      {
        id: "m5",
        type: "text",
        from: "me",
        text: "Got it—I’ll review the doc and reply by evening.",
        time: "Mon 9:22",
      },
      {
        id: "m6",
        type: "text",
        from: "peer",
        text: "Thanks! I’ll send my final draft tonight.",
        time: "Today",
      },
    ],
  },
  "chat-ko": {
    peerName: "Ko Min",
    peerLabel: "Seeker · Career pivot",
    messages: [
      {
        id: "k1",
        type: "text",
        from: "peer",
        text: "Can we reschedule tomorrow’s call to Thursday?",
        time: "1h ago",
      },
      {
        id: "k2",
        type: "text",
        from: "me",
        text: "Thursday 7pm works for me. I’ll send a calendar invite.",
        time: "1h ago",
      },
    ],
  },
  "chat-aung": {
    peerName: "Aung Aung",
    peerLabel: "Seeker · KAIST applications",
    messages: [
      {
        id: "a1",
        type: "file",
        from: "me",
        fileName: "KAIST-checklist.pdf",
        fileSize: "128 KB",
        time: "Yesterday",
      },
      {
        id: "a2",
        type: "text",
        from: "peer",
        text: "This checklist helps a lot—appreciate it.",
        time: "Yesterday",
      },
    ],
  },
  "chat-nu": {
    peerName: "Nu Nu Win",
    peerLabel: "Guide · Scholarships",
    messages: [
      {
        id: "n1",
        type: "text",
        from: "peer",
        text: "Yes, that program fits your timeline. Apply before March 1.",
        time: "30m ago",
      },
      {
        id: "n2",
        type: "image",
        from: "peer",
        imageUrl: "https://picsum.photos/seed/kinnu/480/320",
        imageAlt: "Timeline diagram",
        time: "28m ago",
      },
    ],
  },
  "chat-htet": {
    peerName: "Ko Htet",
    peerLabel: "Guide · Tech internships",
    messages: [
      {
        id: "h1",
        type: "text",
        from: "peer",
        text: "Share your GitHub repo when you’re ready—I’ll leave comments.",
        time: "3h ago",
      },
    ],
  },
};

export function getChatThread(chatId) {
  return chatThreadsDemo[chatId] ?? null;
}
