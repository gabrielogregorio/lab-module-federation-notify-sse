import { useSse } from "./useSse";
//import "../pages/globals.css";

type Props = {
  user: string;
};

export function Notify({ user }: Props) {
  const { notify, status } = useSse(user);

  return (
    <div className="pt-6">
      <ul className="flex flex-col gap-2">
        {Object.keys(notify).map((key, index) => {
          const notifyItem = notify[key];

          if (notifyItem) {
            return (
              <li
                key={notifyItem.id}
                className="border-l-2 border-gray-500 min-h-[2rem] block px-3 bg-red-400 "
              >
                <div>
                  <h3 className="font-bold">{notifyItem.title}</h3>
                  <p className="text-[#ff1199]">{notifyItem.content}</p>
                </div>
              </li>
            );
          }

          return <span key=""></span>;
        })}
      </ul>

      {status.hasError ? (
        <p className="text-red-600 text-sm">
          An error occurred while connecting
        </p>
      ) : undefined}

      {Object.keys(notify).length === 0 ? (
        <p className="text-gray-600 text-sm">No notifications received</p>
      ) : undefined}
    </div>
  );
}
