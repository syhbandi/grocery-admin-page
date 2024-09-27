import { Badge } from "../ui/badge";

const OrderStatus = ({ status }: { status: string }) => {
  if (status === "completed")
    return <Badge variant={"default"}>• {status}</Badge>;
  if (status === "pending")
    return (
      <Badge variant={"outline"} className="bg-warning text-warning-foreground">
        • {status}
      </Badge>
    );
  if (status === "cancelled")
    return <Badge variant={"destructive"}>• {status}</Badge>;
};

export default OrderStatus;
