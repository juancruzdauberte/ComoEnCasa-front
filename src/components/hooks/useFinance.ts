import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAmountMonthly,
  getAmountToday,
  getCashAmountMonthly,
  getCashAmountToday,
  getDeliveryAmountToPay,
  getValueFinanceParam,
  getTransferAmountMonthly,
  getTransferAmountToday,
  updateValueFinanceParam,
  getDeliveryCashAmount,
} from "../services/finances.service";
import { toast } from "sonner";

export const useAmountToday = () => {
  return useQuery({
    queryKey: ["amountToday"],
    queryFn: getAmountToday,
    retry: 3,
  });
};

export const useDeliveryAmountToPay = () => {
  return useQuery({
    queryKey: ["amountDeliveryToPay"],
    queryFn: getDeliveryAmountToPay,
    retry: 3,
  });
};

export const useValueFinanceParam = (paramName: string) => {
  return useQuery({
    queryKey: ["valueFinanceParam", paramName],
    queryFn: () => getValueFinanceParam(paramName),
    enabled: !!paramName,
    retry: 3,
  });
};

export const useAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountMonthly", month, year],
    queryFn: () => getAmountMonthly(month, year),
    enabled: !!month && !!year,
    retry: 3,
  });
};

export const useCashAmountToday = () => {
  return useQuery({
    queryKey: ["amountCashToday"],
    queryFn: getCashAmountToday,
    retry: 3,
  });
};

export const useCashAmountDelivery = () => {
  return useQuery({
    queryKey: ["amountCashTodayDelivery"],
    queryFn: getDeliveryCashAmount,
    retry: 3,
  });
};

export const useCashAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountCashMonthly", month, year],
    queryFn: () => getCashAmountMonthly(month, year),
    enabled: !!month && !!year,
    retry: 3,
  });
};

export const useTransferAmountToday = () => {
  return useQuery({
    queryKey: ["amountTransferToday"],
    queryFn: getTransferAmountToday,
    retry: 3,
  });
};

export const useTransferAmountMonthly = (month: number, year: number) => {
  return useQuery({
    queryKey: ["amountTransferMonthly", month, year],
    queryFn: () => getTransferAmountMonthly(month, year),
    enabled: !!month && !!year,
    retry: 3,
  });
};

export const useUpdateValueParam = () => {
  const queryClient = useQueryClient();
  const { mutate: updateValueParam } = useMutation({
    mutationFn: ({ value, paramName }: { value: number; paramName: string }) =>
      updateValueFinanceParam(value, paramName),
    onSuccess: (_, paramName) => {
      toast.success("Valor de parametro financiero actualizado");
      queryClient.invalidateQueries({
        queryKey: ["valueFinanceParam", paramName],
      });
    },
    onError: () => {
      toast.error("Error al actualizar el valor de parametro financiero");
    },
  });

  return { updateValueParam };
};
