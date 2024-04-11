import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import useDrones from '../hooks/use-drones';
import { ROUTES } from '../lib/routes';
import { MinimalDroneData } from '../types';

type Column = {
  key: keyof MinimalDroneData;
  label: string;
  headerClass?: string;
  cellClass?: string;
  getCell: (...args: any) => ReactNode;
};

const columns: Column[] = [
  {
    key: 'drone_code',
    label: 'Drone Code',
    headerClass: 'w-[200px]',
    cellClass: 'font-bold underline',
    getCell: (droneCode: string) => {
      return <Link to={ROUTES.droneDetail.getPath(droneCode)}>{droneCode}</Link>;
    },
  },
  {
    key: 'name',
    label: 'Name',
    getCell: (name: string) => <div>{name}</div>,
  },
  {
    key: 'range',
    label: 'Range',
    headerClass: 'text-right',
    getCell: (range: number) => <div className='text-right font-bold'>{range}</div>,
  },
  {
    key: 'release_date',
    label: 'Release Date',
    headerClass: 'text-right',
    cellClass: 'text-right',
    getCell: (releaseDate: string) => new Date(releaseDate).toLocaleDateString(),
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
                        {getCell(drone[key])}
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
