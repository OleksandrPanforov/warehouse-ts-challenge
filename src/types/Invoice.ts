import { PricedMaterials } from './Articles.js';

type Invoice = {
  orderId: string,
  articles: Map<PricedMaterials, number>,
  price?: number
};

export { Invoice };
