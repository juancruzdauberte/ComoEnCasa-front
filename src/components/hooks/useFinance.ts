import { useQuery } from "@tanstack/react-query";
import {
  getAmountMonthly,
  getAmountToday,
  getCashAmountMonthly,
  getCashAmountToday,
  getTransferAmountMonthly,
  getTransferAmountToday,
} from "../services/finances.service";

export const useAmountToday = () => {
  return useQuery({
    queryKey: ["amountToday"],
    queryFn: getAmountToday,
  });
};

export const useAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountMonthly", month, year],
    queryFn: () => getAmountMonthly(month, year),
  });
};

export const useCashAmountToday = () => {
  return useQuery({
    queryKey: ["amountCashToday"],
    queryFn: getCashAmountToday,
  });
};

export const useCashAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountCashMonthly", month, year],
    queryFn: () => getCashAmountMonthly(month, year),
  });
};

export const useTransferAmountToday = () => {
  return useQuery({
    queryKey: ["amountTransferToday"],
    queryFn: getTransferAmountToday,
  });
};

export const useTransferAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountTransferMonthly", month, year],
    queryFn: () => getTransferAmountMonthly(month, year),
  });
};
