import api from './api';

export interface Country {
  id: number;
  alpha2_code: string;
  alpha3_code: string;
  name: string;
  states: unknown[];
}

export interface State {
  id: number;
  code: string;
  name: string;
}

export interface Warehouse {
  id: number;
  org_id: number;
  warehouse_code: string;
  warehouse_name: string;
  warehouse_type: string;
  status: string;
  is_granular_tracking_enabled: boolean;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  country_id: number;
  state_id: number;
  country: Country;
  state: State;
  latitude: number;
  longitude: number;
  created_at: string;
  created_by: number;
}

export interface WarehouseListResponse {
  success: boolean;
  message: string;
  data: Warehouse[];
}

class WarehouseService {
  async getWarehouses(): Promise<WarehouseListResponse> {
    try {
      const response = await api.get<WarehouseListResponse>('/api/v1/warehouses');
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      const axiosError = error as { response: { status: number; data?: { message?: string } } };
      return {
        message: axiosError.response.data?.message || 'An error occurred',
        statusCode: axiosError.response.status,
      };
    }
    return {
      message: 'Network error. Please check your connection.',
      statusCode: 0,
    };
  }
}

export default new WarehouseService();
