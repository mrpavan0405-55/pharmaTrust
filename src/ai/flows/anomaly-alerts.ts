// Anomaly Alerts Flow: Detects and alerts for supply chain anomalies.

'use server';

/**
 * @fileOverview Anomaly detection and alerting system for the pharmaceutical supply chain.
 *
 * - `detectAnomalyAndAlert` -  Function to detect anomalies based on IoT data and trigger alerts.
 * - `AnomalyAlertInput` - Input type for the `detectAnomalyAndAlert` function, including IoT data logs.
 * - `AnomalyAlertOutput` - Output type for the `detectAnomalyAndAlert` function, indicating if an anomaly was detected and the alert message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the anomaly detection flow
const AnomalyAlertInputSchema = z.object({
  timestamp: z.string().describe('The timestamp of the IoT data log.'),
  location: z.string().describe('The location of the shipment.'),
  batchId: z.string().describe('The batch ID of the pharmaceutical product.'),
  temperature: z.number().describe('The temperature reading from the IoT sensor.'),
  humidity: z.number().describe('The humidity reading from the IoT sensor.'),
  pressure: z.number().describe('The container pressure reading from the IoT sensor.'),
  transferFlag: z.boolean().describe('A flag indicating a transfer event.'),
});
export type AnomalyAlertInput = z.infer<typeof AnomalyAlertInputSchema>;

// Define the output schema for the anomaly detection flow
const AnomalyAlertOutputSchema = z.object({
  anomalyDetected: z.boolean().describe('Whether an anomaly was detected in the IoT data.'),
  alertMessage: z.string().describe('A message describing the detected anomaly, if any.'),
});
export type AnomalyAlertOutput = z.infer<typeof AnomalyAlertOutputSchema>;

// Define the main function that calls the anomaly detection flow
export async function detectAnomalyAndAlert(input: AnomalyAlertInput): Promise<AnomalyAlertOutput> {
  return anomalyAlertFlow(input);
}

// Define the prompt for anomaly detection
const anomalyAlertPrompt = ai.definePrompt({
  name: 'anomalyAlertPrompt',
  input: {schema: AnomalyAlertInputSchema},
  output: {schema: AnomalyAlertOutputSchema},
  prompt: `You are an AI assistant specialized in detecting anomalies in pharmaceutical supply chain data.

  Based on the following IoT data log, determine if there is any anomaly, such as a temperature deviation, humidity out of range, pressure spike, or a fake transfer.

  IoT Data Log:
  Timestamp: {{{timestamp}}}
  Location: {{{location}}}
  Batch ID: {{{batchId}}}
  Temperature: {{{temperature}}} degrees Celsius
  Humidity: {{{humidity}}}%
  Pressure: {{{pressure}}} kPa
  Transfer Flag: {{{transferFlag}}}

  Consider the normal ranges for temperature (2-8 degrees Celsius), humidity (20-60%), and pressure (100-110 kPa).
  A transfer flag that is true when location hasn't changed is always an anomaly.

  Output in JSON format whether an anomaly was detected and a description of the anomaly. If no anomaly is detected, anomalyDetected should be false and alertMessage should be 'No anomaly detected'.`,
});

// Define the Genkit flow for anomaly detection
const anomalyAlertFlow = ai.defineFlow(
  {
    name: 'anomalyAlertFlow',
    inputSchema: AnomalyAlertInputSchema,
    outputSchema: AnomalyAlertOutputSchema,
  },
  async input => {
    const {output} = await anomalyAlertPrompt(input);
    return output!;
  }
);
