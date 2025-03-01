import { Button } from "@chakra-ui/react";

export default function ButtonComponent({
  text,
  className,
  type,
  loading,
  action,
}: {
  text: string;
  className: string;
  type: "button" | "submit" | "reset";
  loading?: boolean;
  action: () => void;
}) {
  return (
    <Button
      loading={loading}
      onClick={action}
      type={type}
      className={className}
    >
      {text}
    </Button>
  );
}
