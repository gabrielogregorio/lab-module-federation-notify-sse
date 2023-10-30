import { useSse } from "./useSse";

type Props = {
  user: string;
};

export function Notify({ user }: Props) {
  const { notify, status } = useSse(user);

  return (
    <div id="notify-module">
      <div className="pt-6">
        <ul className="flex flex-col gap-2">
          {Object.keys(notify)
            .reverse()
            .map((key) => {
              const notifyItem = notify[key];

              if (notifyItem) {
                return (
                  <li
                    key={notifyItem.id}
                    className="border-l-2 border-black hover:border-l-8 min-h-[2rem] block px-3 group transition-all duration-700 hover:duration-150"
                  >
                    <div>
                      <h3 className="font-bold text-gray-700">
                        {notifyItem.title}
                      </h3>
                      <p className="text-gray-500">{notifyItem.content}</p>
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
    </div>
  );
}
