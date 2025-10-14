import React from 'react';
import { MrzScannerScreenConfiguration } from "../configuration/mrz/MRZScannerScreenConfiguration";
import { MrzScannerUiResult } from "../configuration/mrz/MRZScannerUIResult";
declare class Props {
    configuration: MrzScannerScreenConfiguration;
    onClose: () => void;
    onSubmit: (result: MrzScannerUiResult) => void;
    onError: (error: Error) => void;
}
export declare function MrzScannerController(props: Props): React.JSX.Element;
export {};
