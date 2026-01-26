import type { Hospital, Supplier, SMSLog, Delivery } from '@/lib/types';

// Omdurman Hospitals - Coordinates are approximate for demonstration
export const hospitals: Hospital[] = [
  { id: 'h1', name: 'Omdurman Teaching Hospital', location: { lat: 15.644, lng: 32.478 }, currentWater: 1500, dailyUsage: 2000, phone: '+249912345678', managerName: 'Dr. Fatima Ahmed', managerContact: '+249911111111' },
  { id: 'h2', name: 'Al-Nau Hospital', location: { lat: 15.630, lng: 32.490 }, currentWater: 4500, dailyUsage: 1800, phone: '+249912345679', managerName: 'Dr. Yusuf Ibrahim', managerContact: '+249922222222' },
  { id: 'h3', name: 'Al-Saudi Hospital', location: { lat: 15.610, lng: 32.500 }, currentWater: 10000, dailyUsage: 2500, phone: '+249912345680', managerName: 'Dr. Aisha Musa', managerContact: '+249933333333' },
  { id: 'h4', name: 'Al-Waleedain Hospital', location: { lat: 15.655, lng: 32.465 }, currentWater: 20000, dailyUsage: 3000, phone: '+249912345681', managerName: 'Dr. Khalid Hassan', managerContact: '+249944444444' },
  { id: 'h5', name: 'Al-Amal Hospital', location: { lat: 15.621, lng: 32.482 }, currentWater: 30000, dailyUsage: 2200, phone: '+249912345682', managerName: 'Dr. Samira Ali', managerContact: '+249955555555' },
  { id: 'h6', name: 'Omdurman Maternity Hospital', location: { lat: 15.648, lng: 32.475 }, currentWater: 4000, dailyUsage: 4000, phone: '+249912345683', managerName: 'Dr. Layla Omar', managerContact: '+249966666666' },
  { id: 'h7', name: 'Armed Forces Hospital', location: { lat: 15.605, lng: 32.488 }, currentWater: 6000, dailyUsage: 1500, phone: '+249912345684', managerName: 'Gen. Ibrahim Saleh', managerContact: '+249977777777' },
  { id: 'h8', name: 'Police Hospital', location: { lat: 15.590, lng: 32.510 }, currentWater: 50000, dailyUsage: 4000, phone: '+249912345685', managerName: 'Col. Ahmed Khalil', managerContact: '+249988888888' },
  { id: 'h9', name: 'Fedail Hospital', location: { lat: 15.635, lng: 32.505 }, currentWater: 2500, dailyUsage: 1000, phone: '+249912345686', managerName: 'Dr. Mohamed Bakri', managerContact: '+249999999999' },
  { id: 'h10', name: 'Asia Hospital', location: { lat: 15.615, lng: 32.470 }, currentWater: 8000, dailyUsage: 1200, phone: '+249912345687', managerName: 'Dr. Nadia Jamil', managerContact: '+249910101010' },
  { id: 'h11', name: 'Al-Rahma Hospital', location: { lat: 15.600, lng: 32.460 }, currentWater: 12000, dailyUsage: 1800, phone: '+249912345688', managerName: 'Dr. Hiba Abdelrahman', managerContact: '+249912121212' },
];

export const suppliers: Supplier[] = [
  { id: 's1', name: 'DAL Group', contact: '+249987654321', availableCapacity: 20000, location: 'Port Sudan' },
  { id: 's2', name: 'Soba Water', contact: '+249987654322', availableCapacity: 15000, location: 'Port Sudan' },
  { id: 's3', name: 'Nile Co', contact: '+249987654323', availableCapacity: 30000, location: 'Port Sudan' },
];

export let smsLogs: SMSLog[] = [
  { id: 'sms1', time: new Date(Date.now() - 2 * 60 * 60 * 1000), hospitalName: 'Omdurman Teaching Hospital', phone: '+249912345678', message: 'WATER 1500', waterAmount: 1500 },
  { id: 'sms2', time: new Date(Date.now() - 3 * 60 * 60 * 1000), hospitalName: 'Al-Nau Hospital', phone: '+249912345679', message: 'Water level is 4500L', waterAmount: 4500 },
  { id: 'sms3', time: new Date(Date.now() - 4 * 60 * 60 * 1000), hospitalName: 'Al-Saudi Hospital', phone: '+249912345680', message: 'WATER 10000', waterAmount: 10000 },
  { id: 'sms4', time: new Date(Date.now() - 5 * 60 * 60 * 1000), hospitalName: 'Omdurman Maternity Hospital', phone: '+249912345683', message: 'Current water: 4000L', waterAmount: 4000 },
];

export let deliveries: Delivery[] = [
  { id: 'd1', hospitalId: 'h1', hospitalName: 'Omdurman Teaching Hospital', supplierId: 's1', supplierName: 'DAL Group', amount: 6000, deliveryTime: new Date(Date.now() + 2 * 60 * 60 * 1000), status: 'scheduled' },
  { id: 'd2', hospitalId: 'h6', hospitalName: 'Omdurman Maternity Hospital', supplierId: 's2', supplierName: 'Soba Water', amount: 5000, deliveryTime: new Date(Date.now() + 4 * 60 * 60 * 1000), status: 'scheduled' },
  { id: 'd3', hospitalId: 'h7', hospitalName: 'Armed Forces Hospital', supplierId: 's3', supplierName: 'Nile Co', amount: 8000, deliveryTime: new Date(Date.now() - 24 * 60 * 60 * 1000), status: 'completed' },
];
