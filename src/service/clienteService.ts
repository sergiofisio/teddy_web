import api from "./api";

export const getClients = async () => {
  try {
    const response = await api.get("/clientes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getClient = async (id: number) => {
  console.log(id);

  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

export const createClient = async (data: any) => {
  const response = await api.post("/clientes", data);
  return response.data;
};

export const updateClient = async (id: number, data: any) => {
  const response = await api.patch(`/clientes/${id}`, data);
  return response.data;
};

export const deleteClient = async (id: number) => {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
};

export const deleteMultipleClients = async (ids: number[]) => {
  const response = await api.delete("/clientes", { data: { ids } });
  return response.data;
};
