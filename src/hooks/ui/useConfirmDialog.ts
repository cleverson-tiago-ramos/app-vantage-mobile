import { useState } from "react";

export function useConfirmDialog() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
    setLoading(false);
  }

  async function confirm(action: () => Promise<void> | void) {
    try {
      setLoading(true);
      await action();
      close();
    } catch {
      setLoading(false);
    }
  }

  return {
    visible,
    loading,
    open,
    close,
    confirm,
  };
}
