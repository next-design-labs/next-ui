import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates and returns a unique UUID that persists across renders.
 */
export const useUUID = () => {
  // Use useRef to persist the UUID across renders
  const uuidRef = useRef<string>();

  // Generate a UUID only once
  if (!uuidRef.current) {
    uuidRef.current = uuidv4();
  }

  return uuidRef.current;
};
