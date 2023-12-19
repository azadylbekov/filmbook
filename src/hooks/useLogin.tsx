import { useEffect, useState } from "react";
import { useLazyGetNewGuestSessionIdQuery } from "@/services/FilmBookService";
import { toast } from "react-toastify";

const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [getNewSessionTrigger, getNewSessionData] =
    useLazyGetNewGuestSessionIdQuery();
  const {
    data: newSessionId,
    isLoading: isNewSessionLoading,
    error: isNewSessionError,
  } = getNewSessionData;

  useEffect(() => {
    if (!isNewSessionLoading) {
      setIsLoginLoading(false);
      if (getNewSessionData.status == "fulfilled") {
        toast.success("Logged in as a guest!", {
          position: toast.POSITION.TOP_CENTER,
        });
        const guestSessionId = newSessionId.guest_session_id;
        localStorage.setItem("guestSessionId", guestSessionId);
      }
      if (isNewSessionError) {
        const error =
          "Error! Could not login as a guest! " +
          isNewSessionError?.data?.status_message;
        toast.success(error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }, [isNewSessionLoading, getNewSessionData, isNewSessionError]);

	function onLogin() {
		setIsLoginLoading(true);
    getNewSessionTrigger();
	}

	return [onLogin, isLoginLoading] as const;
};

export default useLogin;
