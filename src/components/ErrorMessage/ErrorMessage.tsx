
interface ErrorMessageProps {
  error: object
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  console.log("error", error);
  return (
    <div className="bg-[#9f313196] border !border-[#ec5757] text-gray-200 rounded p-2 text-center">
      {error?.status && <h3 className="text-xl">Status: {error?.status}</h3>}
      {error?.data?.status_code && (
        <h4 className="text-xl">Status code: {error?.data?.status_code}</h4>
      )}
      {error?.data?.status_message && (
        <h4 className="text-xl">{error?.data?.status_message}</h4>
      )}
      {error?.data?.errors &&
        error?.data?.errors.map((error, index) => (
          <h4 key={index} className="text-xl">{error}</h4>
        ))}
    </div>
  );
}
