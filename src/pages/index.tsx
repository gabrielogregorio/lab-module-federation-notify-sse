import { Notify as NotifyBase } from "../components/Notify";

export const Notify = NotifyBase;

import "./globals.css";
export default function Test() {
  return (
    <div>
      <Notify user="v" />
    </div>
  );
}
