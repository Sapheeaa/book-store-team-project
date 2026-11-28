export interface PromoCode {
  code: string;
  discountPercent: number;
}

const PROMO_CODES: PromoCode[] = [
  { code: 'READ10', discountPercent: 10 },
  { code: 'READ20', discountPercent: 20 },
];

export function checkPromoCode(inputStr: string): PromoCode | null {
  const normalized = inputStr.trim().toUpperCase();

  if (normalized === '') return null;

  const promoCode = PROMO_CODES.find((promo) => promo.code === normalized);
  return promoCode ?? null;
}
