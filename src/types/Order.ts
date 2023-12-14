import { Article } from "./Articles";

type Order = {
    id: string,
    articles: string[],
    installationDate: Date,
};

type OrderArticles = {
    orderId: string,
    articles?: Article[],
}

export { Order, OrderArticles }