type Article = {
    id: string,
    productCode: string,
    name: string,
    description: string,
    stock: number,
}

type HeatPump = Article & {
    unitPrice: number,
};

type InstallationMaterial = Article & {
    unitPrice: number,
};

type Tool = Article & {};

type PricedMaterials = HeatPump | InstallationMaterial;

export { Article, HeatPump, InstallationMaterial, Tool, PricedMaterials }