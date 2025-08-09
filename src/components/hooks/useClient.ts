import { useQuery } from "@tanstack/react-query";
import { getClient } from "../services/clients.service";

export const useCLient = (phone: string) => {
  return useQuery({
    queryKey: ["client", phone],
    queryFn: () => getClient(phone),
    enabled: !!phone,
  });
};
