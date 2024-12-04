import ssrHttpService from "@/ssr/http.ssr.service";

export type NavigationParams = {
  slugs: string[];
  id: string;
};

export type RoutingParams = {
  params: NavigationParams;
  searchParams?: {
    page: string;
    pageSize: string;
  };
};

const serverAction = (action: () => any | Promise<any>) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await action();
      res(response.data);
    } catch (error) {
      console.error(error);
    }
  });
};

function getEmployees(page = 1, pageSize = 10) {
  return serverAction(() => ssrHttpService.get(`/user?page=${page}&pageSize=${pageSize}`));
}
function getEmployee(id: string) {
  return serverAction(() => ssrHttpService.get(`/user/${id}`));
}
function deleteEmployee(id: string) {}
function updateEmployee(id: string, values: any) {}
function createEmployee(values: any) {}

function getAddresses() {
  return serverAction(() => ssrHttpService.get("/api/address"));
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

export default function useServerActions() {
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
