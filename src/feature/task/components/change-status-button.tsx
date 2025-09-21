import { Button } from "@/components/ui/button";
import { status } from "@prisma/client";
import React, { useTransition } from "react";
import { useUpdateStatusTask } from "../hooks/useTask";
import { Loader2 } from "lucide-react";

interface ChangeStatusButtonProps {
  status: status;
  id: string;
}

const ChangeStatusButton = ({ status, id }: ChangeStatusButtonProps) => {
  const { mutate, isPending } = useUpdateStatusTask();

  const [_isPending, startTransition] = useTransition();

  const buttonContent = [
    { status: "pending", label: "✅ Start Progress" },
    { status: "inProgress", label: "🎯 Mark as Done" },
    { status: "done", label: "🔄 Reset to Pending" },
  ];

  const currentButton = buttonContent.find((b) => b.status === status);

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
          {currentButton && (
            <Button
              className="flex md:hidden"
              disabled={isPending}
              variant="outline"
              onClick={handleChangeStatus}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {isPending ? (
                <>
                <Loader2 className="animate-spin"/>
                  <p>Changing status...</p>
                </>
              ) : (
                currentButton.label
              )}
            </Button>
          )}
        </div>
      </>
    </div>
  );
};

export default ChangeStatusButton;
