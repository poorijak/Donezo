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

export const checkDueDate = (date: Date | null , twoholdDay: number = 2) => {

  if (!date) return false

  const now = dayjs(new Date());
  const due = dayjs(date);

  const diff = due.diff(now, "day");


  return  diff <= twoholdDay
};
