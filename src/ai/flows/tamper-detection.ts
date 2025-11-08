'use server';

/**
 * @fileOverview Simulates tamper detection in IoT logs and generates alerts.
 *
 * - tamperDetection - A function that detects tampering based on IoT logs.
 * - TamperDetectionInput - The input type for the tamperDetection function.
 * - TamperDetectionOutput - The return type for the tamperDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TamperDetectionInputSchema = z.object({
  iotLogs: z
    .string()
    .describe(
      'IoT sensor logs containing data about shipment movement, temperature, humidity, and container pressure.'
    ),
  expectedConditions: z
    .string()
    .describe('Expected environmental conditions for the shipment.'),
});
export type TamperDetectionInput = z.infer<typeof TamperDetectionInputSchema>;

const TamperDetectionOutputSchema = z.object({
  isTampered: z.boolean().describe('Whether tampering is detected or not.'),
  alertMessage: z.string().describe('Alert message if tampering is detected.'),
});
export type TamperDetectionOutput = z.infer<typeof TamperDetectionOutputSchema>;

export async function tamperDetection(input: TamperDetectionInput): Promise<TamperDetectionOutput> {
  return tamperDetectionFlow(input);
}

const tamperDetectionPrompt = ai.definePrompt({
  name: 'tamperDetectionPrompt',
  input: {schema: TamperDetectionInputSchema},
  output: {schema: TamperDetectionOutputSchema},
  prompt: `You are an AI agent specializing in detecting tampering in pharmaceutical shipments based on IoT sensor logs.

You will receive IoT sensor logs and expected environmental conditions for a shipment.
Analyze the logs to determine if any tampering has occurred.

IoT Logs: {{{iotLogs}}}
Expected Conditions: {{{expectedConditions}}}

Based on your analysis, determine if tampering is detected and set the isTampered field accordingly.
If tampering is detected, provide an alert message in the alertMessage field explaining the nature of the tampering.
If no tampering is detected, alertMessage should be empty string.

Ensure that the output can be parsed by JSON.parse.
`,
});

const tamperDetectionFlow = ai.defineFlow(
  {
    name: 'tamperDetectionFlow',
    inputSchema: TamperDetectionInputSchema,
    outputSchema: TamperDetectionOutputSchema,
  },
  async input => {
    const {output} = await tamperDetectionPrompt(input);
    return output!;
  }
);
