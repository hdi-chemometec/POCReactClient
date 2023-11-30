import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const useWebSocketWithRetry = (socketUrl: string, onClose: ()=>void, onOpen: ()=>void) => {
  const [nextRetryAttemptInMs, setNextRetryAttemptInMs] = useState(0);

  const shouldReconnectCallback = () => {
    return true;
  };

  const reconnectIntervalCallback = (retryAttempt: number) => {
    const nextRetryAttempt = Math.min(Math.pow(2, retryAttempt) * 100, 10000);
    setNextRetryAttemptInMs(nextRetryAttempt);
    return Math.min(Math.pow(2, retryAttempt) * 100, 10000);
  };

  const { lastJsonMessage, readyState, sendJsonMessage, lastMessage, getWebSocket } = useWebSocket(
    socketUrl,
    {
      onOpen: onOpen,
      onClose: onClose,
      shouldReconnect: shouldReconnectCallback,
      reconnectAttempts: 10000,
      reconnectInterval: reconnectIntervalCallback,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setNextRetryAttemptInMs(0);
    }
  }, [readyState]);

  return {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    nextRetryAttemptInMs,
    lastMessage,
    getWebSocket,
  };
};
