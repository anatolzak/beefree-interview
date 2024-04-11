import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import useDrones from '../hooks/use-drones';
import { API_ENDPOINTS } from '../lib/constants';
import { ROUTES } from '../lib/routes';
import { droneSchema } from '../schema';
import { DetailedDroneData } from '../types';

const CreateDrone = () => {
  /**
   * We fetch all the drones and cache them so that by the time the user
   * creates a new drone, we can directly modify the cached drones list
   * in local storage.
   */
  useDrones();

  const navigate = useNavigate();

  const form = useForm<DetailedDroneData>({
    resolver: zodResolver(droneSchema),
    defaultValues: { cameras: [{}], release_date: new Date().toISOString() },
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
              <FormItem className='flex flex-col'>
                <FormLabel>Release Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className='w-[240px] pl-3 text-left font-normal'
                      >
                        {format(field.value, 'PPP')}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      selected={new Date(field.value)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
