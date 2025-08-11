import { useQuery } from "@tanstack/react-query";
import {
  getAmountToday,
  getCashAmountToday,
  getTransferAmountToday,
} from "../services/finances.service";

export const useAmountToday = () => {
  return useQuery({
    queryKey: ["amountToday"],
    queryFn: getAmountToday,
  });
};

export const useCashAmountToday = () => {
  return useQuery({
    queryKey: ["amountCashToday"],
    queryFn: getCashAmountToday,
  });
};

export const useTransferAmountToday = () => {
  return useQuery({
    queryKey: ["amountTransferToday"],
    queryFn: getTransferAmountToday,
  });
};
