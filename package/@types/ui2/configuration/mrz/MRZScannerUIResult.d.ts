import { DeepPartial, PartiallyConstructible } from "../utils";
import { GenericDocument } from "../GenericDocument";
/**
Configuration of the MRZ RTU UI result.
*/
export declare class MrzScannerUiResult extends PartiallyConstructible {
    /**
      Raw string value of MRZ
      */
    readonly rawMRZ: string;
    /**
      Generic document containing MRZ data
      */
    readonly mrzDocument: GenericDocument | null;
    /** @param source {@displayType `DeepPartial<MrzScannerUiResult>`} */
    constructor(source?: DeepPartial<MrzScannerUiResult>);
}
