import dayjs from "@/lib/dayjs";

export const formatDateToDDMMYY = (date: Date | undefined | null) => {
  if (!date) {
    return "No due date";
  }
  return dayjs(date).format("DD-MMM-YYYY").split("-", 3).join(" ");
};
export const formatDateToYYYYMMDD = (date: Date | undefined | null) => {
  if (!date) {
    return "No due date";
  }
  return dayjs(date).format("YYYY-MM-DD");
};
