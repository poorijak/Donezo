import { db } from "@/lib/db";

const InitialTags = [
  { title: "Study", icon: "📚", slug: "study", base: "blue" },
  { title: "Work", icon: "💼", slug: "work", base: "gray" },
  { title: "Personal", icon: "👤", slug: "personal", base: "violet" },
  { title: "Shopping", icon: "🛒", slug: "shopping", base: "pink" },
  { title: "Meeting", icon: "📅", slug: "meeting", base: "indigo" },
  { title: "Creative", icon: "🎨", slug: "creative", base: "teal" },
  { title: "Finance", icon: "🏦", slug: "finance", base: "yellow" },
  { title: "Travel", icon: "✈️", slug: "travel", base: "orange" },
  { title: "Countdown", icon: "⏱️", slug: "fitness", base: "orange" },
];

const seed = async () => {
  await db.tag.deleteMany();

  const tags = InitialTags.map((tag) => ({
    title: tag.title,
    icon: tag.icon,
    slug: tag.slug,
    bgColor: `bg-${tag.base}-300`,
    textColor: `text-${tag.base}-500`,
  }));

  await db.tag.createMany({ data: tags });
};

seed();
