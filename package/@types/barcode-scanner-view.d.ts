import React from "react";
import { ScanbotCameraProps, ScanbotCameraState, ScannerView } from "./scanner-view";
import { IBarcodeScannerHandle } from "./interfaces/i-barcode-scanner-handle";
import ViewFinder from "./view/view-finder";
import { ShutterButtonAction } from "./view/shutter-button";
import BarcodeCalculationPopup from "./view/barcode-calculation/barcode-calculation-popup";
import AnimatedBarcodeSelectionOverlay from "./view/barcode-polygon/animated-barcode-selection-overlay";
import BottomActionBar from "./view/action-bar/bottom-action-bar";
import ScannedImageWithOverlay from "./view/barcode-calculation/scanned-image-with-overlay";
import { BarcodeScannerViewConfiguration } from "./model/configuration/barcode-scanner-view-configuration";
import { Size } from "./utils/dto/Size";
import { BarcodeItem } from "./core-types";
import type { ObjectId } from "./core-types";
export declare class BarcodeScannerProps extends ScanbotCameraProps {
}
export declare class BarcodeScannerState extends ScanbotCameraState {
    isFinderVisible?: boolean;
    action: ShutterButtonAction;
    image?: string;
    bottomHintText?: string;
}
export default class BarcodeScannerView extends ScannerView<BarcodeScannerProps, BarcodeScannerState> implements IBarcodeScannerHandle {
    finder?: ViewFinder;
    shouldComputeSize: boolean;
    private _configuration;
    private paused;
    overlay?: AnimatedBarcodeSelectionOverlay | undefined;
    popup: BarcodeCalculationPopup | undefined;
    scannedImage: ScannedImageWithOverlay | undefined;
    bottomActionBar: BottomActionBar | undefined;
    handle: ObjectId<"BarcodeScanner"> | null;
    readonly barcodes: BarcodeItem[];
    private detectionRunning;
    constructor(props: BarcodeScannerProps);
    get configuration(): BarcodeScannerViewConfiguration;
    get enabled(): boolean;
    /**
     * Public API functions
     */
    static create(configuration: BarcodeScannerViewConfiguration): Promise<BarcodeScannerView>;
    isDetectionPaused(): boolean;
    resumeDetection(): Promise<void>;
    pauseDetection(): void;
    private readonly updateDimensionsCallback;
    /**
     * React Overrides
     */
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: Readonly<BarcodeScannerProps>, prevState: Readonly<BarcodeScannerState>, snapshot?: any): void;
    componentWillUnmount(): void;
    updateDimensions(): Promise<void>;
    resume(): Promise<void>;
    pause(): void;
    detect(): Promise<void>;
    backendurl: string | undefined;
    setUseBackendService(url: string | undefined): void;
    private recognizeBarcodes;
    desiredRecognitionResolution: number | undefined;
    setRecognitionResolution(resolution: number): void;
    getResolution(): Promise<Size>;
    saveExtractedImageData(): void;
    setFinderVisible(isVisible: boolean): void;
    updateTorch(enabled: boolean): void;
    render(): React.JSX.Element;
    resetCountImage(): void;
    countLabelText(barcodes: BarcodeItem[]): string;
}
