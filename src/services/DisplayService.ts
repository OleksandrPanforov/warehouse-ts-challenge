import { Package } from "../types/Package";
import { success, highlight, warning, error } from "../utilities/loggingFormat";
import { IDisplayService } from "./IDisplayService";

export class DisplayService implements IDisplayService {
    private readonly separator: string = '\t+-------------------------+----------------------------------------+\r\n';
    displayPackage(toDisplay: Package): void {
        const message = 
           `${success(`Package summary for order ${toDisplay.orderId}`)}\r\n` +
             this.separator +
            `\t| ${highlight('Installation date:')}\r\n` +
            `\t| ${toDisplay.installationDate}\r\n` +
            this.separator +
            `\t${this.invoiceDisplay(toDisplay)}\r\n` +
            this.separator +
            `\t${this.toolsDisplay(toDisplay)}\r\n` +
            this.separator +
            `\t${(toDisplay.restocking?.articles?.size || 0 > 0) ? this.restockingDisplay(toDisplay) : ""}`;
        console.log(message);
    }

    private invoiceDisplay(toDisplay: Package): string {
        let result: string = `| ${highlight('Package invoice:')}\r\n`;
        for (let [article, count] of toDisplay.invoice?.articles ?? []) {
            result += `\t| ${article.name} (${article.productCode}), ${count} piece(s), priced at ${article.unitPrice} with total of ${(count * article.unitPrice).toFixed(2)};\r\n`;
        }
        result += `\t| ${highlight('Total price is:')} ${toDisplay.invoice?.price}`;
        return result;
    }

    private toolsDisplay(toDisplay: Package): string {
        let result: string = `| ${highlight('Tools in package:')}\r\n`;
        for (let tool of toDisplay.tools ?? []) {
            result += `\t| ${tool.name} (${tool.productCode});\r\n`;
        }
        result += "\t|"
        return result;
    }

    private restockingDisplay(toDisplay: Package): string {
        let result: string = `| ${warning('Please, pay attention to items that need to be restocked:')}\r\n`;
        for (let [article, count] of toDisplay.restocking?.articles ?? []) {
            result += `\t| ${article.name} (${article.productCode}), ${count} piece(s) required with stock of ${article.stock}.\r\n`;
            (count - article.stock) == 0
                ? result += `\t| ${warning('Item stock is empty')};\r\n`
                : result += `\t| ${error(`Lacking ${count - article.stock} piece(s)`)};\r\n`;
        }
        return result;
    }


}