import { api } from "../config/axios";
import type { GetClientResponse } from "../types/types";

export async function getClient(
  phone: string
): Promise<GetClientResponse | null> {
  try {
    const { data } = await api.get<GetClientResponse | null>(
      `/clients/${phone}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
}
