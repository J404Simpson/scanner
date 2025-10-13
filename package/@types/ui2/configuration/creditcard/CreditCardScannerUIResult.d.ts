import { CreditCardScanningStatus } from "../CreditCardTypes";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { GenericDocument } from "../GenericDocument";
/**
Configuration of the credit card scanner RTU UI result.
*/
export declare class CreditCardScannerUiResult extends PartiallyConstructible {
    /**
      The status of the credit card recognition step
      */
    readonly recognitionStatus: CreditCardScanningStatus;
    /**
      Generic document containing credit card data. Not present, if status is FAIL.
      */
    readonly creditCard: GenericDocument | null;
    /** @param source {@displayType `DeepPartial<CreditCardScannerUiResult>`} */
    constructor(source?: DeepPartial<CreditCardScannerUiResult>);
}
