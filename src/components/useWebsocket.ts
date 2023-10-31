import { useEffect, useState } from "react";
import { useGetNotify } from "./useGetNotify";
import { INotifyById } from "./types";

export const useWebsocket = (user: string) => {
  const [notify, setNotify] = useState<INotifyById>({});
  const [status, setStatus] = useState({
    isOpen: false,
    hasError: false,
  });

  const notifyBase = useGetNotify(user);

  useEffect(() => {
    if (notifyBase.notify) {
      let allNotify: INotifyById = {};

      notifyBase.notify.forEach((items) => {
        allNotify[items.id] = items;
      });

      setNotify((prev) => {
        return {
          ...prev,
          ...allNotify,
        };
      });
    }
  }, [notifyBase.notify]);

  useEffect(() => {
    const webSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_WEBSOCKET}?name=${user}`
    );

    webSocket.onopen = () => {
      webSocket.send(JSON.stringify({ name: user }));

      setStatus(() => {
        return {
          hasError: false,
          isOpen: true,
        };
      });
    };

    webSocket.onerror = () => {
      setStatus(() => {
        return {
          isOpen: false,
          hasError: true,
        };
      });
    };

    webSocket.onmessage = (event) => {
      const newNotify = JSON.parse(event.data).message;
      setNotify((prev) => {
        return {
          ...prev,
          [newNotify.id.toString()]: newNotify,
        };
      });
    };

    return () => {
      webSocket.close();
    };
  }, [user]);

  return { notify, status };
};
