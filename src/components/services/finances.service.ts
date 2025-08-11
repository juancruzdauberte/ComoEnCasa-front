import { api } from "../config/axios";
import type { GetAmountTodayResponse } from "../types/types";

export async function getAmountToday() {
  try {
    const { data } = await api.get<GetAmountTodayResponse>("/finances/today");
    return data.total;
  } catch (error) {
    console.log(error);
  }
}

export async function getCashAmountToday() {
  try {
    const { data } = await api.get<GetAmountTodayResponse>(
      "/finances/today/cash"
    );
    return data.total;
  } catch (error) {
    console.log(error);
  }
}

export async function getTransferAmountToday() {
  try {
    const { data } = await api.get<GetAmountTodayResponse>(
      "/finances/today/transfer"
    );
    return data.total;
  } catch (error) {
    console.log(error);
  }
}
