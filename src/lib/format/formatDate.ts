import dayjs from "@/lib/dayjs";

const formatDate = (date: Date | undefined | null) => {
  if (!date) {
    return "No due date";
  }

  return dayjs(date).format("DD/MMM/YYYY").split("/", 3).join(" ");
};

export default formatDate;
