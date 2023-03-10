import { FormFields } from '../types';

export const price1 = 130;
export const fee1 = 91;
export const price2 = 150;
export const fee2 = 105;
export const kidsPrice1 = 70;
export const kidsFee1 = 49;
export const kidsPrice2 = 90;
export const kidsFee2 = 63;
export const indivPrice = 250;
export const indivfee = 140;
export const processingFee = 0.05;

// End of day
export const changeDate = new Date('2023-02-14T23:59:01+01:00');
export const endDate = new Date('2023-03-05T00:00:01+01:00');

export const indivMinHours = 1;
export const indivMaxHours = 5;

export const defaultFields: FormFields = {
  name: '',
  email: '',
  technique: false,
  khaligi: false,
  mejance: false,
  indivOleynikova: false,
  indivOstrovska: false,
  indivHoursOleynikova: 1,
  indivHoursOstrovska: 1,
  payment: undefined,
};
