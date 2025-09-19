import { Button } from "@/components/ui/button";
import { status } from "@prisma/client";
import React, { useTransition } from "react";
import { useUpdateStatusTask } from "../hooks/useTask";

interface ChangeStatusButtonProps {
  status: status;
  id: string;
}

const ChangeStatusButton = ({ status, id }: ChangeStatusButtonProps) => {
  const { mutate } = useUpdateStatusTask();

  const [isPending, startTransition] = useTransition();

  const handleChangeStatus = () => {
    let newStatus: status | null = null;

    if (status === "pending") newStatus = "inProgress";
    if (status === "inProgress") newStatus = "done";
    if (status === "done") newStatus = "pending";

    if (newStatus) {
      startTransition(() => {
        mutate({
          id,
          status: newStatus,
        });
      });
    }
  };

  return (
    <div>
      <>
        <div>
          {status === "pending" && (
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleChangeStatus}
            >
              ✅ Start Progress
            </Button>
          )}

          {status === "inProgress" && (
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleChangeStatus}
            >
              🎯 Mark as Done
            </Button>
          )}

          {status === "done" && (
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleChangeStatus}
            >
              🔄 Reset to Pending
            </Button>
          )}
        </div>
      </>
    </div>
  );
};

export default ChangeStatusButton;
