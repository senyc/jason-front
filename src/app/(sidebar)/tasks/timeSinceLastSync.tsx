'use server';
import { Clock } from "react-feather";
import { getLastAccessedTime } from "./actions";
import TimeContents from "./timeContents";

export default async function TimeSinceLastSync() {
  return (
    <div
      className="ml-auto mr-3 flex flex-row items-center gap-1">
      <Clock 
        className="text-gray-400"
        size={17} 

      />
      <TimeContents
        startTime={await getLastAccessedTime()}
      />
    </div>
  );
}
