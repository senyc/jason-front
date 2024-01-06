import { TaskView } from '@annotations/taskView';
import { Dispatch } from 'react';
import { filterOrder } from '@config/filterOrder';
interface FilterSelectionProps {
  currFilter: TaskView;
  setFilterSelection: Dispatch<TaskView>;
}
export default function FilterSelection({ currFilter, setFilterSelection }: FilterSelectionProps) {

  const cycleFilterOptions = () => {
    const currIndex = filterOrder.findIndex(element => element == currFilter);
    const newIndex = (currIndex + 1) % filterOrder.length;
    setFilterSelection(filterOrder[newIndex]);
  };
  return (
    <button className="w-42 rounded-lg p-2 text-sm font-normal" onClick={cycleFilterOptions}>{`${currFilter}`}</button>
  );
}
