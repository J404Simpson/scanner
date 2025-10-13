import React, { MutableRefObject } from "react";
import MrzScannerView from "../../../mrz-scanner-view";
import { MrzScannerScreenConfiguration } from "../../configuration/mrz/MRZScannerScreenConfiguration";
import { MrzScannerResult } from "../../../core/bridge/compiled/MrzTypes";
export type MrzResultCallback = (result: MrzScannerResult) => void;
declare class Props {
    visible?: boolean;
    config: MrzScannerScreenConfiguration;
    onCameraPermissionDenied: (err: Error) => void;
    onMrzDetected: MrzResultCallback;
    onScannerReady: (scanner: MutableRefObject<MrzScannerView>) => void;
    onError: any;
}
export declare function MrzScannerBox(props: Props): React.JSX.Element;
export {};
