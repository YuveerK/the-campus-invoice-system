import { atom } from "recoil";

export const viewInvoiceState = atom({
  key: "viewInvoiceState",
  default: false,
});

export const listState = atom({
  key: "listState",
  default: [],
});
