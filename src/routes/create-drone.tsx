import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import useDrones from '../hooks/use-drones';
import { API_ENDPOINTS } from '../lib/constants';
import { ROUTES } from '../lib/routes';
import { droneSchema } from '../schema';
import { DetailedDroneData } from '../types';

const CreateDrone = () => {
  useDrones();

  const navigate = useNavigate();

  const form = useForm<DetailedDroneData>({
    resolver: zodResolver(droneSchema),
    defaultValues: { cameras: [{}] },
  });

  const camerasControl = useFieldArray({
    control: form.control,
    name: 'cameras',
  });

  const onSubmit = ({ cameras, ...droneData }: DetailedDroneData) => {
    const drones = JSON.parse(localStorage.getItem(API_ENDPOINTS.listDrones) ?? '') ?? [];

    // add current drone to list-drones cache
    localStorage.setItem(API_ENDPOINTS.listDrones, JSON.stringify([...drones, droneData]));

    // add current drone to detail-drone cache
    localStorage.setItem(
      API_ENDPOINTS.droneDetail(droneData.drone_code),
      JSON.stringify({ ...droneData, cameras })
    );

    navigate(ROUTES.listDrones.path);
  };

  return (
    <section className='max-w-2xl mx-auto py-10'>
      <Link
        to={ROUTES.listDrones.path}
        className='flex space-x-3 items-center mb-5'
      >
        <ChevronLeft /> Back to all drones
      </Link>
      <div className='mb-8 flex justify-between items-center'>
        <h1 className='text-4xl font-medium'>Create Drone</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='drone_code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drone Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='range'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Range</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='release_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mb-3 flex justify-between items-center'>
            <h2 className='text-2xl font-medium'>Cameras</h2>
            <Button
              size='sm'
              variant='outline'
              type='button'
              onClick={() => camerasControl.prepend({ megapixels: 0, name: '', type: '' })}
            >
              Add Camera
            </Button>
          </div>

          {camerasControl.fields.map((field, index) => (
            <div
              key={field.id}
              className='border rounded-lg py-3 px-4'
            >
              <Button
                className='ml-auto block'
                variant='outline'
                size='sm'
                type='button'
                onClick={() => camerasControl.remove(index)}
              >
                Delete camera
              </Button>

              <FormField
                control={form.control}
                name={`cameras.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`cameras.${index}.megapixels`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Megapixels</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`cameras.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateDrone;
