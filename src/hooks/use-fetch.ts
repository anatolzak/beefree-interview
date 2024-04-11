import { useEffect, useState } from "react";
import useLocalStorage from "./use-localstorage";
import useStateRef from "./use-stateref";

type Options = {
  noRefetch: boolean;
};

const useFetch = <T>(url: string, fetchArgs?: RequestInit | undefined, opts: Options = { noRefetch: true }) => {
  const [data, setData] = useLocalStorage<T>(url);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const argsRef = useStateRef(fetchArgs);
  const optsRef = useStateRef(opts);
  const dataRef = useStateRef(data);


  useEffect(() => {
    if (dataRef.current !== null && optsRef.current.noRefetch) return;

    let shouldCancel = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const resp = await fetch(url, {
          ...argsRef.current,
          headers: {
            'content-type': 'application/json',
            ...argsRef.current?.headers
          }
        });

        if (shouldCancel) return;

        const data = await resp.json() as T;

        if (!resp.ok) {
          setIsLoading(false);
          setError(data);
        }

        setIsLoading(false);
        setError(null);
        setData(data);
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }

    };

    fetchData();

    return () => {
      shouldCancel = true;
    };
  }, [url, setData, argsRef, dataRef, optsRef]);

  return { data, isLoading, error };
};

export default useFetch;