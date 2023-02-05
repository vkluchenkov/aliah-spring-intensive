import { FormFields } from '../types';

export const price1 = 130;
export const price2 = 150;
export const kidsPrice1 = 70;
export const kidsPrice2 = 90;
export const indivPrice = 250;
export const processingFee = 0.05;

export const changeDate = new Date('2023-02-14T00:00:01+01:00');
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
