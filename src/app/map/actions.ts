'use server';

import { autoScheduleDelivery } from '@/ai/flows/auto-schedule-delivery';
import { revalidatePath } from 'next/cache';

export async function triggerAutoSchedule(hospitalId: string) {
  try {
    const result = await autoScheduleDelivery({ hospitalId });
    if (result.success) {
      // In a real app, this would update the database and revalidate data sources.
      // For this demo, we can revalidate the delivery schedule page to show potential updates.
      revalidatePath('/delivery-schedule');
    }
    return { success: result.success, message: result.message };
  } catch (error) {
    console.error('Error triggering auto-schedule:', error);
    // Check if error is an object with a message property
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Failed to schedule delivery: ${message}` };
  }
}
