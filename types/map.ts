export type Trip = {
  id: number;
  name: string;
  description: string;
  year: number;
  color: string;
  departure_port: string;
  departure_date: string;
  arrival_port: string;
  arrival_date: string;
};

export type Stage = {
  id: number;
  trip_id: number;
  name: string;
  description: string;
  departure_port: string;
  departure_date: string;
  arrival_port: string;
  arrival_date: string;
};

export type Waypoint = {
  id: number;
  stage_id: number;
  latitude: number;
  longitude: number;
};

export type Live = {
  id: number;
  transport: 'IRIDIUM' | 'GPRS' | 'OTHER';
  trigger: 'ROUTINE' | 'BURST' | 'MANUAL' | 'ACTIVATION' | 'DEACTIVATION' | 'CONFIG_REPORT' | 'WAYPOINT' | 'MESSAGE' | 'ACKNOWLEDGE' | 'BLUETOOTH_LOSS' | 'COLLISION' | 'COUNTDOWN' | 'DEAD_MAN' | 'GEOFENCE' | 'BUTTON' | 'CANCEL_ALERT' | 'POWER_LOSS' | 'POWER_GAIN' | 'TEMPERATURE' | 'GENERIC' | 'BLE_RAW' | 'SERIAL_RAW' | 'MAILBOX_CHECK' | 'APP_MESSAGE' | 'WATCHING_START_REQUEST' | 'WATCHING_STOP_REQUEST';
  source: 'GPS' | 'IRIDIUM';
  latitude: number;
  longitude: number;
  speed: number;
  course: number;
  altitude: number;
  average_speed: number;
  average_course: number;
  temperature: number;
  battery: number;
  pluggedIn: boolean;
}