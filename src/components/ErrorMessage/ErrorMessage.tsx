import { SerializedError, IErrorData } from "@/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FC, useEffect, useState } from "react";

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  const [status, setStatus] = useState<string | number>();
  const [statusCode, setStatusCode] = useState<string | number>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errors, setErrors] = useState<Array<string>>([]);

  useEffect(() => {
    if ("status" in error) {
      setStatus(error.status);
      if (isIErrorData(error.data)) {
        setStatusCode(error.data.status_code);
        setStatusMessage(error.data.status_message);
        if (error.data.errors) {
          setErrors(error.data.errors);
        }
      }
    }
  }, [error]);

  function isIErrorData(obj: any): obj is IErrorData {
    return (
      obj &&
      typeof obj === "object" &&
      "status_code" in obj &&
      "status_message" in obj
    );
  }

  return (
    <div className="bg-[#9f313196] border !border-[#ec5757] text-gray-200 rounded p-2 text-center">
      {status && <h3 className="text-xl">Status: {status}</h3>}
      {statusCode && <h4 className="text-xl">Status code: {statusCode}</h4>}
      {statusMessage && <h4 className="text-xl">{statusMessage}</h4>}
      {errors &&
        errors.map((error, index) => (
          <h4 key={index} className="text-xl">
            {error}
          </h4>
        ))}
    </div>
  );
};

export default ErrorMessage;
