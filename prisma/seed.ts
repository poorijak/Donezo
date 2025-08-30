import { db } from "@/lib/db";

const InitialTags = [
  { title: "Study", icon: "📚", slug: "study", color: "3B82F6" },
  { title: "Work", icon: "💼", slug: "work", color: "6B7280" },
  { title: "Personal", icon: "👤", slug: "personal", color: "8B5CF6" },
  { title: "Shopping", icon: "🛒", slug: "shopping", color: "EC4899" },
  { title: "Meeting", icon: "📅", slug: "meeting", color: "6366F1" },
  { title: "Creative", icon: "🎨", slug: "creative", color: "14B8A6" },
  { title: "Finance", icon: "🏦", slug: "finance", color: "F59E0B" },
  { title: "Travel", icon: "✈️", slug: "travel", color: "F97316" },
  { title: "Countdown", icon: "⏱️", slug: "fitness", color: "F97316" },
];

const seed = async () => {
  await db.tag.deleteMany();

  for (const tag of InitialTags) {
    await db.tag.createMany({
      data: tag,
    });
  }
};

seed();
