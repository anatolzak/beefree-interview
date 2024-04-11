import { API_ENDPOINTS } from "../lib/constants";
import { MinimalDroneData } from "../types";
import useFetch from "./use-fetch";

const useDrones = () => {
  const { data: drones, error, isLoading } = useFetch<MinimalDroneData[]>(API_ENDPOINTS.listDrones);
  return { drones, error, isLoading, };
};

export default useDrones;