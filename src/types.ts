export interface FormPopupProps {
  onClose: () => void;
}

export type Workshops = 'technique' | 'khaligi' | 'mejance' | 'indivOleynikova' | 'indivOstrovska';

export type Payment = 'Bank' | 'PayPal' | 'Card' | undefined;

export interface FormFields {
  name: string;
  email: string;
  technique: boolean;
  khaligi: boolean;
  mejance: boolean;
  indivOleynikova: boolean;
  indivOstrovska: boolean;
  indivHoursOleynikova: number;
  indivHoursOstrovska: number;
  payment: Payment;
}

export interface OrderPayload extends FormFields {
  total: {
    total: number;
    fee: number;
    grandTotal: number;
  };
  lng: string;
}
