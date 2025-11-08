
'use server';

import { detectAnomalyAndAlert } from '@/ai/flows/anomaly-alerts';

// This is a simplified state for the form. In a real app, you might have more complex state.
export type AnomalyState = {
  status: 'idle' | 'loading' | 'ok' | 'anomaly' | 'error';
  message: string;
};

export async function checkForAnomaly(
  prevState: AnomalyState
): Promise<AnomalyState> {
  // Hardcode some data that represents an anomaly to send to the AI model
  const anomalousData = {
    timestamp: new Date().toISOString(),
    location: 'Warehouse B',
    batchId: 'B-12345',
    temperature: 12, // Anomaly: outside 2-8 C range
    humidity: 50,
    pressure: 105,
    transferFlag: false,
  };

  try {
    const result = await detectAnomalyAndAlert(anomalousData);
    if (result.anomalyDetected) {
      return { status: 'anomaly', message: result.alertMessage };
    }
    return { status: 'ok', message: 'Success: No anomalies were detected in the simulation.' };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Error: Failed to check for anomalies.' };
  }
}

export type SettingsState = {
    status: 'idle' | 'loading' | 'ok' | 'error';
    message: string;
};

export async function saveSettings(
    prevState: SettingsState,
    formData: FormData
  ): Promise<SettingsState> {
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // You can access form data like this:
    // const fullName = formData.get('name');
    // const email = formData.get('email');
    // const emailNotifications = formData.get('email-notifications') === 'on';
  
    console.log('Settings saved:', Object.fromEntries(formData));
  
    return { status: 'ok', message: 'Your settings have been saved successfully.' };
  }
