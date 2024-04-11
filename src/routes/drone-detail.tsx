import { AlertCircle, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../components/ui/table';
import { API_ENDPOINTS } from '../lib/constants';
import useDetailedDrone from '../hooks/use-detailed-drone';
import { ROUTES } from '../lib/routes';

const DroneDetail = () => {
  const { droneCode } = useParams();
  const { droneData, error } = useDetailedDrone(droneCode!);

  return (
    <section className='max-w-5xl mx-auto py-10 px-3'>
      <Link
        to={ROUTES.listDrones.path}
        className='flex space-x-3 items-center mb-5'
      >
        <ChevronLeft /> Back to all drones
      </Link>

      <h1 className='text-4xl mb-5 font-medium'>{droneData ? droneData.name : 'Loading...'}</h1>

      {!!error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      )}

      {!!droneData && (
        <>
          <div className='h-28 mb-5'>
            <img
              src={API_ENDPOINTS.getDroneImage(droneCode!)}
              alt={droneData?.name}
              className='h-full object-contain'
            />
          </div>

          <Table className='mb-10'>
            <TableBody>
              <TableRow>
                <TableHead scope='row'>Drone Code</TableHead>
                <TableCell>{droneData.drone_code}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope='row'>Name</TableHead>
                <TableCell>{droneData.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope='row'>Range</TableHead>
                <TableCell>{droneData.range}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope='row'>Release Date</TableHead>
                <TableCell>{new Date(droneData.release_date).toLocaleDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h2 className='text-2xl font-medium mb-3'>Cameras</h2>

          <div className='space-y-4'>
            {droneData.cameras.map(({ megapixels, name, type }, idx) => {
              return (
                <div key={idx}>
                  <div className='text-lg'>{name}</div>
                  <div className='flex items-center space-x-2 text-muted-foreground'>
                    <span>{megapixels}MP</span>
                    <span>|</span>
                    <span>Type: {type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default DroneDetail;
