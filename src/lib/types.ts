export type Hospital = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  currentWater: number; // in liters
  dailyUsage: number; // in liters/day
  phone: string;
  managerName: string;
  managerContact: string;
};

export type WaterStatusLevel = 'critical' | 'urgent' | 'warning' | 'safe';

export type HospitalWithStatus = Hospital & {
  status: {
    level: WaterStatusLevel;
    hoursRemaining: number;
  };
};

export type SMSLog = {
  id: string;
  time: Date;
  hospitalName: string;
  phone: string;
  message: string;
  waterAmount: number; // in liters
};

export type DeliveryStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export type Delivery = {
  id: string;
  hospitalId: string;
  hospitalName: string;
  supplierId: string;
  supplierName: string;
  amount: number; // in liters
  deliveryTime: Date;
  status: DeliveryStatus;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  availableCapacity: number; // in liters
  location?: string;
};
