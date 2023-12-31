import { ChangeEvent, Dispatch, SetStateAction } from "react";

const inputSetter = (setter: Dispatch<SetStateAction<string>>) => {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(event.target.value);
  };
};


export { inputSetter };
