import { status } from "@prisma/client";

const formatStatus = (status: status | undefined) => {
  switch (status) {
    case "pending":
      return "To do";
      break;
    case "inProgress":
      return "In Progress";
      break;

    case "done":
      return "Done";
      break;

    default:
      return "To do";
  }
};

export default formatStatus