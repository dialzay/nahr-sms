'use server';

/**
 * @fileOverview This flow automates the scheduling of emergency water deliveries
 * when a hospital's water level falls below a critical threshold (12 hours).
 *
 * - autoScheduleDelivery - A function that triggers the automated delivery scheduling process.
 * - AutoScheduleDeliveryInput - The input type for the autoScheduleDelivery function (hospital ID).
 * - AutoScheduleDeliveryOutput - The return type indicating success or failure of scheduling.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoScheduleDeliveryInputSchema = z.object({
  hospitalId: z
    .string()
    .describe('The ID of the hospital to check water levels and schedule delivery if needed.'),
});
export type AutoScheduleDeliveryInput = z.infer<typeof AutoScheduleDeliveryInputSchema>;

const AutoScheduleDeliveryOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the delivery scheduling was successful.'),
  message: z.string().describe('A message indicating the result of the operation.'),
});
export type AutoScheduleDeliveryOutput = z.infer<typeof AutoScheduleDeliveryOutputSchema>;

// Define a tool to create a new delivery.
const createDelivery = ai.defineTool(
  {
    name: 'createDelivery',
    description: 'Schedules a water delivery to a hospital.',
    inputSchema: z.object({
      hospitalId: z.string().describe('The ID of the hospital receiving the delivery.'),
      amount: z.number().describe('The amount of water to deliver in liters.'),
      deliveryTime: z.string().describe('The delivery time, in ISO format (YYYY-MM-DDTHH:mm:ssZ).'),
    }),
    outputSchema: z.object({
      success: z.boolean().describe('True if the delivery was scheduled successfully.'),
      message: z.string().describe('A message confirming the delivery details.'),
    }),
  },
  async (input) => {
    // TODO: Replace with actual implementation to schedule a delivery.
    // This is a placeholder; in a real application, this would interact with
    // a database or external service to create a delivery.
    console.log(
      `[createDelivery tool] Scheduling delivery to hospital ${input.hospitalId} of ${input.amount} liters at ${input.deliveryTime}.`
    );
    return {
      success: true,
      message: `Successfully scheduled delivery of ${input.amount} liters to hospital ${input.hospitalId} at ${input.deliveryTime}.`, // Keep the response short!
    };
  }
);

const checkWaterLevelAndScheduleDeliveryPrompt = ai.definePrompt({
  name: 'checkWaterLevelAndScheduleDeliveryPrompt',
  input: {schema: AutoScheduleDeliveryInputSchema},
  output: {schema: AutoScheduleDeliveryOutputSchema},
  tools: [createDelivery],
  prompt: `You are a system designed to monitor hospital water levels and automatically schedule emergency deliveries.

  A hospital is considered to be in critical condition if its water level falls below 12 hours of supply.

  Given the hospital ID: {{{hospitalId}}}, determine if an emergency water delivery needs to be scheduled.

  If the hospital's water level is below 12 hours, use the createDelivery tool to schedule a delivery for 5000 liters within the next 2 hours.
  Return a success message if the delivery is scheduled, or a message indicating no action was needed.

  Important: Only call the createDelivery tool if the water level is critically low (less than 12 hours remaining).
  If you are calling createDelivery tool, the deliveryTime must be in ISO format and be 2 hours from now.
  Otherwise, do not call any tools.
  `,
});

const autoScheduleDeliveryFlow = ai.defineFlow(
  {
    name: 'autoScheduleDeliveryFlow',
    inputSchema: AutoScheduleDeliveryInputSchema,
    outputSchema: AutoScheduleDeliveryOutputSchema,
  },
  async input => {
    // TODO: Replace with actual implementation to fetch hospital data (water level, daily usage).
    // This is placeholder data.  In a real application, this would query a database.
    const hospitalData = {
      id: input.hospitalId,
      currentWater: 1000, // Example: 1000 liters
      dailyUsage: 200, // Example: 200 liters per day
    };

    const hoursRemaining = hospitalData.currentWater / (hospitalData.dailyUsage / 24);

    console.log(`[autoScheduleDeliveryFlow] Hospital ${input.hospitalId} has ${hoursRemaining} hours of water remaining.`);

    if (hoursRemaining < 12) {
      console.log(`[autoScheduleDeliveryFlow] Water level is critical.  Calling prompt to schedule delivery.`);
      const {output} = await checkWaterLevelAndScheduleDeliveryPrompt(input);
      return output!;
    } else {
      console.log(`[autoScheduleDeliveryFlow] Water level is sufficient.  No delivery needed.`);
      return {
        success: false,
        message: `Hospital ${input.hospitalId} has sufficient water (>${hoursRemaining} hours). No delivery scheduled.`, // Keep response short.
      };
    }
  }
);

export async function autoScheduleDelivery(input: AutoScheduleDeliveryInput): Promise<AutoScheduleDeliveryOutput> {
  return autoScheduleDeliveryFlow(input);
}
