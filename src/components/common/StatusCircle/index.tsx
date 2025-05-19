
type StatusCircleProps = {
  status: "success" | "pending" | "failed";
};
const StatusCircle = ({ status }: StatusCircleProps) => {
  const colors = {
    success: "bg-primary",
    pending: "bg-warning",
    failed: "bg-error",
  };

  return (
    <div className={`w-[24px] h-[24px] rounded-full ${colors[status]}`}></div>
  );
};

export default StatusCircle;
