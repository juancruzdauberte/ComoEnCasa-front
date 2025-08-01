import { api } from "../config/axios";

export async function logOut(): Promise<void> {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    console.error(error);
  }
}
