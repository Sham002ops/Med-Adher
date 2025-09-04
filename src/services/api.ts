import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:4000';

class ApiService {
  private async getHeaders() {
    const token = await AsyncStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async createPatient(patientData: any) {
    const response = await fetch(`${BASE_URL}/patient`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(patientData),
    });
    return response.json();
  }

  async logAdherence(patientId: string, adherenceData: any) {
    const response = await fetch(`${BASE_URL}/patient/${patientId}/observation`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(adherenceData),
    });
    return response.json();
  }

  async getMedicationRequests(patientId: string) {
    const response = await fetch(`${BASE_URL}/patient/${patientId}/medication-requests`, {
      headers: await this.getHeaders(),
    });
    return response.json();
  }
}

export const apiService = new ApiService();
