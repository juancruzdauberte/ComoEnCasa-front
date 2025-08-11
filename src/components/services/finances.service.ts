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

export async function getAmountMonthly(month: number, year: number) {
  try {
    const { data } = await api.get<GetAmountTodayResponse>(
      `/finances/monthly?month=${month}&year=${year}`
    );
    return data.total;
  } catch (error) {
    console.log(error);
  }
}

export async function getCashAmountMonthly(month: number, year: number) {
  try {
    const { data } = await api.get<GetAmountTodayResponse>(
      `/finances/monthly/cash?month=${month}&year=${year}`
    );
    return data.total;
  } catch (error) {
    console.log(error);
  }
}

export async function getTransferAmountMonthly(month: number, year: number) {
  try {
    const { data } = await api.get<GetAmountTodayResponse>(
      `/finances/monthly/transfer?month=${month}&year=${year}`
    );
    return data.total;
  } catch (error) {
    console.log(error);
  }
}
