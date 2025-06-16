import {
  toISOStringWithTimeSmart,
  toISOStringDateOnly,
} from "@/shared/utils/utils";

import { OrderForm } from "@/features/orders/create-order/CreateOrder";

export const mapOrderFormToApiPayload = (form: OrderForm) => {
  const tires = form.tires || {};

  const { start, finish } = toISOStringWithTimeSmart(
    form.datate_of_repair,
    form.time_start_service ?? "",
    form.time_finish_service ?? ""
  );

  return {
    customerId: "1",
    employeeId: "1",
    command: "string",
    customerName: form.customer_order,
    employeeName: form.mechanic_name,
    locationOfRepair: form.location_of_repair,
    equipament: form.equipment_order,
    dateOfRepair: toISOStringDateOnly(form.datate_of_repair),
    timeStart: start,
    timeFinish: finish,
    licencePlate: form.license_plate,
    po: form.po_number,
    vin: form.vin_number,
    rif: tires.rif,
    rof: tires.rof,
    rir: tires.rir,
    ror: tires.ror,
    lif: tires.lif,
    lof: tires.lof,
    lir: tires.lir,
    lor: tires.lor,
    cif: tires.cif,
    cof: tires.cof,
    cir: tires.cir,
    cor: tires.co,
    statusWorkOrder: 0,
    quickBookEstimateId: "",
    observation: form.observation,
    workOrderDetails:
      form.work_items?.map((item) => ({
        itemId: 0,
        quantity: Number(item.quantity),
        observation: item.description,
      })) ?? [],
    createWorkOrderPhotos: [],
  };
};
