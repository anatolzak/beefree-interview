import useFetch from "./use-fetch";
import { API_ENDPOINTS } from "../lib/constants";
import { DetailedDroneData } from "../types";

const useDetailedDrone = (droneCode: string) => {
  const {
    data,
    error,
    isLoading,
  } = useFetch<DetailedDroneData | null>(API_ENDPOINTS.droneDetail(droneCode));

  return { droneData: data, error, isLoading };
};

export default useDetailedDrone;