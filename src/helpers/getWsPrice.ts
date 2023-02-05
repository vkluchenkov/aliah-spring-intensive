import { Workshops } from '../types';
import { changeDate, kidsPrice1, kidsPrice2, price1, price2 } from '../utils/constants';

export const getWsPrice = (ws: Workshops) => {
  const today = new Date();

  if (changeDate > today) return ws === 'technique' ? kidsPrice1 : price1;
  else return ws === 'technique' ? kidsPrice2 : price2;
};
