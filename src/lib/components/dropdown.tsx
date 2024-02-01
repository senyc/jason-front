'use client';
import OutsideClickHandler from 'react-outside-click-handler';

interface DropdownProps {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  summaryClassNames?: string
}

export default function Dropdown({ id, summary, children, summaryClassNames }: DropdownProps) {
  /**
  * This can only be solved via event handlers not a controlled component 
  * via: https://github.com/facebook/react/issues/15486 
  */
  const toggleOpen = () => {
    document.getElementById(id)?.removeAttribute('open');
  };

  return (
    <OutsideClickHandler
      onOutsideClick={toggleOpen}
    >
      <details
        id={id}
        className="dropdown dropdown-bottom"
      >
        <summary
          role="button"
          className={`list-none ${summaryClassNames}`}
        >
          {summary}
        </summary>
        {children}
      </details>
    </OutsideClickHandler >
  );
}
