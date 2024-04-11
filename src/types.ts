import { z } from "zod";
import { droneCameraSchema, droneSchema } from "./schema";

export type DroneCamera = z.infer<typeof droneCameraSchema>;

export type DetailedDroneData = z.infer<typeof droneSchema>;

export type MinimalDroneData = Omit<DetailedDroneData, 'cameras'>;
