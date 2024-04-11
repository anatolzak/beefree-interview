import CreateDrone from '../routes/create-drone';
import DroneDetail from '../routes/drone-detail';
import ListDrones from '../routes/list-drones';

type Route = {
  path: string;
  getPath: (...args: any) => string;
  element: JSX.Element;
};

export const ROUTES = {
  listDrones: {
    path: '/',
    element: <ListDrones />,
    getPath() {
      return this.path;
    },
  },
  createDrone: {
    path: '/create-drone',
    element: <CreateDrone />,
    getPath() {
      return this.path;
    },
  },
  droneDetail: {
    path: '/drone/:droneCode',
    element: <DroneDetail />,
    getPath: (droneCode: string) => `/drone/${droneCode}`,
  },
} satisfies Record<string, Route>;
