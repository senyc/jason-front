import { Filter } from '@annotations/filter';
import { Dispatch } from 'react';
import { filterOrder } from '@config/filterOrder';
interface FilterSelectionProps {
  currFilter: Filter;
  setFilterSelection: Dispatch<Filter>;
}
export default function FilterSelection({ currFilter, setFilterSelection }: FilterSelectionProps) {

  const cycleFilterOptions = () => {
    const currIndex = filterOrder.findIndex(element => element == currFilter);
    const newIndex = (currIndex + 1) % filterOrder.length;
    setFilterSelection(filterOrder[newIndex]);
  };
  return (
    <button onClick={cycleFilterOptions}>{`${currFilter}`}</button>
  );
}
