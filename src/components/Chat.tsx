import { FC, useEffect, useState } from "react";
import hackathon from "../hackathon.png";
import Results from "./Results";
import axios, { AxiosResponse } from "axios";

interface Input {
  subject: string;
  level: string;
  method: string;
}

interface Result {
  coveringPoints: string[];
  pointDetails: { [key: string]: string };
  realWorld: { [key: string]: string };
}

const Chat: FC = () => {
  const [input, setInput] = useState<Input>({
    subject: "",
    level: "",
    method: "",
  });

  const [response, setResponse] = useState<Result>({
    coveringPoints: ["sdfsdf", "slkjsdlf", "sdflskjdf"],
    pointDetails: { key: "value", key1: "value1" },
    realWorld: { key: "value", key1: "value1" },
  });
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (input: Input) => {
    setLoading(true);

    try {
      const response: AxiosResponse<Result> = await axios.post(
        "http://localhost:3001/api/prompt",
        input
      );
      setResponse(response.data);
    } catch (error: any) {
      setError(error);
    }

    setLoading(false);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     try {
  //       const response: AxiosResponse<Result> = await axios.post(
  //         "http://localhost:3001/api/prompt",
  //         input
  //       );
  //       setResponse(response.data);
  //     } catch (error: any) {
  //       setError(error);
  //     }

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);
 const sendMessage = () => {
    fetchData(input)
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div>
        <img src={hackathon} alt="hackathon" style={{ height: "100px" }} />
        {/* {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.user}: </strong>
            {message.message}
          </p>
        ))} */}
      </div>

      <input
        name="subject"
        value={input.subject}
        onChange={handleInputChange}
        type="text"
        placeholder="Subject"
      />

      <input
        name="level"
        value={input.level}
        onChange={handleInputChange}
        type="text"
        placeholder="Level"
      />

      <input
        name="method"
        value={input.method}
        onChange={handleInputChange}
        type="text"
        placeholder="Method"
      />
      <button onClick={sendMessage}>Send</button>

      {response !== null && <Results response={response} />}
    </div>
  );
};

export default Chat;
