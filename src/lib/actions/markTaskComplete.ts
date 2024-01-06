import { getJwtToken } from "../auth";

const markTaskComplete = (id: number) => {
  const makeRequest = async () => {
    try {
      const res = await fetch(`http://localhost:8080/site/tasks/markComplete?id=${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getJwtToken()}`,
        },
      });

      if (res.ok) {
        const resData = await res.json();
      }
    } catch (e) {
      console.log(e);
      let message = "unknown error";
      if (e instanceof Error) {
        message = e.message;
      }
      return;
    }
  };
  makeRequest();
  return;

};

export default markTaskComplete;
