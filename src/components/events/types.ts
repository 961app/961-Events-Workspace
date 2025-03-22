export interface TicketFormData {
  name: string;
  type: 'single' | 'pass' | 'group';
  basePrice: string;
  quantity: string;
  maxPerOrder: string;
  groupSize?: string;
  isVisible: boolean;
  isSoldOut: boolean;
  dealDiscount: string;
  saleStartDate: Date | undefined;
  saleEndDate: Date | undefined;
  saleStartTime: string | undefined;
  saleEndTime: string | undefined;
  selectedDates: string[];
}

export const initialTicketData: TicketFormData = {
  name: '',
  type: 'single',
  basePrice: '',
  quantity: '',
  maxPerOrder: '',
  isVisible: true,
  isSoldOut: false,
  dealDiscount: '',
  saleStartDate: undefined,
  saleEndDate: undefined,
  saleStartTime: undefined,
  saleEndTime: undefined,
  selectedDates: []
};

export function calculateFinalPrice(basePrice: string): string {
  const price = parseFloat(basePrice) || 0;
  const processingFee = price * 0.035 + 0.35;
  return (price + processingFee).toFixed(2);
}