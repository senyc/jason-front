// probably force the sidebar to be out
export default function Settings() {
  return (<div
    className="flex h-full w-full flex-row"
  >
    <section className="min-w-72 h-full border-x-[.5px] border-gray-200">
      <ul className="mt-3">
        <li className="">
          <button className="h-10 w-full">
            <p>
              Account settings
            </p>
          </button>
        </li>

        <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
        <li className="">
          <button className="h-10 w-full">
            <p>
              Developer settings
            </p>
          </button>
        </li>

        <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
      </ul>
      <li className="">
        <button className="h-10 w-full">
          <p>
            Display settings
          </p>
        </button>
      </li>

      <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
    </section>
  </div>
  );
}
