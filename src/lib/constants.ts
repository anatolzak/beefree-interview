const API_BASE_URL = 'https://interviews-api.beefreeagro.com';

export const API_ENDPOINTS = {
  listDrones: `${API_BASE_URL}/api/v1/drones`,
  droneDetail: (droneCode: string) => `${API_BASE_URL}/api/v1/drones/${droneCode}`,
  getDroneImage: (droneCode: string) => `${API_BASE_URL}/api/v1/drones/${droneCode}/image`,
};