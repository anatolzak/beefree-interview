import AddDrone from '../routes/add-drone';
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
  addDrone: {
    path: '/add-drone',
    element: <AddDrone />,
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
