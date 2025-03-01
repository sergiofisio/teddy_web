import { Box, Field, Input, defineStyle } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { useRef, useEffect } from "react";

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});

export default function InputComponent({
  label,
  type,
  mask,
  onChange,
  value,
  className,
  onBlur,
  MaxLength,
}: {
  label: string;
  type: string;
  mask?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  MaxLength?: number;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current && mask) {
      withMask(mask)(inputRef.current);
    }
  }, [mask]);

  return (
    <Field.Root className={className}>
      <Box pos="relative" w="full">
        <Input
          className="!border-black !p-4"
          type={type}
          ref={inputRef}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          maxLength={MaxLength}
        />
        <Field.Label css={floatingStyles}>{label}</Field.Label>
      </Box>
    </Field.Root>
  );
}
