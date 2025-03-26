import { useRouter } from "next/navigation";

// React
import { useEffect, useState } from "react";

export const useFetchData = ({
  fetcher,
  args,
  deps,
  redirect,
}: {
  fetcher?: any;
  args?: any;
  deps: any[];
  redirect?: any;
}) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [statusText, setStatusText] = useState<any>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, statusText, success, message, data } = await fetcher({
          ...args,
        });

        if (!success && status === 401) {
          // 401
          return router.push("/welcome?session_expired=true");
        }
        if (!success && redirect && redirect.status === status) {
          // custom status check & redirect
          return router.push(redirect.path);
        }

        if (!success) {
          throw new Error(message || "Failed to fetch data");
        }

        setLoading(false);
        setStatus(status);
        setStatusText(statusText);
        setSuccess(success);
        setMessage(message);
        setData(data);
      } catch (error: any) {
        setLoading(false);
        setStatus(null);
        setStatusText("");
        setSuccess(false);
        setError(error);
        setMessage(error.message || "Failed to fetch data");
        setData(null);
      }
    };

    fetchData();
  }, [...deps]);

  return { status, statusText, success, message, data, loading, error };
};
