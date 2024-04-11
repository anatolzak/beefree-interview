import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import useDrones from '../hooks/use-drones';
import { ROUTES } from '../lib/routes';
import { MinimalDroneData } from '../types';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { API_ENDPOINTS } from '../lib/constants';

type Column<T extends object> = {
  key: keyof T;
  label: string;
  headerClass?: string;
  cellClass?: string;
  getCell: (item: T) => ReactNode;
};

const columns: Column<MinimalDroneData>[] = [
  {
    key: 'drone_code',
    label: 'Drone Code',
    headerClass: 'w-[200px]',
    cellClass: 'font-bold underline',
    getCell: ({ drone_code, name }: MinimalDroneData) => {
      return (
        <Tooltip
          disableHoverableContent
          delayDuration={200}
        >
          <TooltipTrigger asChild>
            <Link to={ROUTES.droneDetail.getPath(drone_code)}>{drone_code}</Link>
          </TooltipTrigger>
          <TooltipContent>
            <div className='h-28 w-32 mb-5 flex justify-center items-center'>
              <img
                src={API_ENDPOINTS.getDroneImage(drone_code!)}
                alt={name}
                className='h-full object-contain'
              />
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    key: 'name',
    label: 'Name',
    getCell: ({ name }) => name,
  },
  {
    key: 'range',
    label: 'Range',
    headerClass: 'text-right',
    cellClass: 'font-bold text-right',
    getCell: ({ range }) => range,
  },
  {
    key: 'release_date',
    label: 'Release Date',
    headerClass: 'text-right',
    cellClass: 'text-right',
    getCell: ({ release_date }) => new Date(release_date).toLocaleDateString(),
  },
];

const ListDrones = () => {
  const { drones, error, isLoading } = useDrones();

  return (
    <section className='max-w-5xl mx-auto py-10'>
      <div className='mb-8 flex justify-between items-center'>
        <h1 className='text-4xl font-medium'>Drones</h1>
        <Button asChild>
          <Link to={ROUTES.createDrone.path}>Add Drone</Link>
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      {!!error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      )}

      {!!drones && (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ key, label, headerClass }) => {
                return (
                  <TableHead
                    key={key}
                    className={headerClass}
                  >
                    {label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {drones.map((drone) => {
              return (
                <TableRow key={drone.drone_code}>
                  {columns.map(({ key, cellClass, getCell }) => {
                    return (
                      <TableCell
                        key={key}
                        className={cellClass}
                      >
                        {getCell(drone)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default ListDrones;
