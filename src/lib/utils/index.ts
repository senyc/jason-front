import { ChangeEvent, Dispatch, SetStateAction } from "react";
import NewTask from "../annotations/newTasks";

const inputSetter = (setter: Dispatch<SetStateAction<string>>) => {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(event.target.value);
  };
};

const newTaskSetter = (setter: Dispatch<SetStateAction<NewTask>>) => {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter((prevTask) => {
      return {
        ...prevTask,
        [event.target.name]: event.target.value
      };
    });
  };
};


export { inputSetter, newTaskSetter };
