import httpService from "@/services/http.service";

const serverAction = (action: () => any | Promise<any>) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await action();
      res(response.data);
    } catch (error) {
      console.error(error);
      rej(error);
    }
  });
};

function getEmployees(page = "1", pageSize = "10") {
  return serverAction(() => httpService.get(`/user?page=${page}&pageSize=${pageSize}`));
}
function getEmployee(id: string) {}
function deleteEmployee(id: string) {
  return serverAction(() => httpService.delete(`/api/user/${id}`));
}
function updateEmployee(id: string, values: any) {
  return serverAction(() => httpService.patch(`/api/user/${id}`, values));
}
function createEmployee(values: any) {
  return serverAction(() => httpService.post(`/api/user`, values));
}

function getAddresses() {
  return serverAction(() => httpService.get("/api/address"));
}
function getAddress(id: string) {}
function deleteAddress(id: string) {}
function updateAddress(id: string, values: any) {}
function createAddress(values: any) {}

function getAddressTypes() {}
function getAddressType(id: string) {}
function deleteAddressType(id: string) {}
function updateAddressType(id: string, values: any) {}
function createAddressType(values: any) {}

export default function useClientActions() {
  return {
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    createEmployee,

    getAddresses,
    getAddress,
    deleteAddress,
    updateAddress,
    createAddress,

    getAddressTypes,
    getAddressType,
    deleteAddressType,
    updateAddressType,
    createAddressType,
  };
}
