import { Notify as NotifyBase } from "../components/Notify";
import { NotifyWebsocket as NotifyWebsocketBase } from "../components/NotifyWs";

export const Notify = NotifyBase;
export const NotifyWs = NotifyWebsocketBase;

import "./globals.css";

export default function Test() {
  return (
    <div>
      <Notify user="v" />
      <NotifyWs user="v" />
    </div>
  );
}
