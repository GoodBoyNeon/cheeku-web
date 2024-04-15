"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SendButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Send
    </Button>
  );
}
