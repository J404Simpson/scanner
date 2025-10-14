import React from "react";
import ScanbotSDK from "./scanbot-sdk";
import { ScannerConfiguration } from "./model/configuration/scanner-configuration";
import ScanbotCameraView from "./view/scanbot-camera-view";
import { CameraInfo } from "./model/camera-info";
export declare class ScanbotCameraProps {
    configuration: ScannerConfiguration;
    container?: HTMLElement;
    onSuccess?: (scanner: any) => void;
    onFailure?: (err: Error) => void;
    sdk?: ScanbotSDK;
    /**
     * The user should check that the license is valid before using the BarcodeScannerView.
     * In case the license expires while the scanner is open, `onLicenseError` will be called.
     */
    onLicenseError?: () => void;
}
export declare class ScanbotCameraState {
    videoReady: boolean;
    sdkReady: boolean;
    zoom?: number;
}
export declare abstract class ScannerView<P extends ScanbotCameraProps, S extends ScanbotCameraState> extends React.Component<P, S> {
    static DEFAULT_DETECTION_RESOLUTION: number;
    static DETECTION_RESOLUTION_4K: number;
    protected constructor(props: P);
    camera: ScanbotCameraView | null;
    disposed?: boolean;
    get bridge(): import("./worker/worker-bridge").WorkerBridge;
    dispose(): void;
    /**
     * Internal functions
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    isSupported(): boolean;
    onVideoReady: () => void;
    onVideoError: (err: Error) => void;
    setZoom(zoom: number): void;
    setCameraDirection(direction: "environment" | "user"): void;
    swapCameraFacing(force?: boolean): void;
    switchCamera(deviceId: string, mirrored?: boolean): Promise<void>;
    getActiveCameraInfo(): CameraInfo | undefined;
    fetchAvailableCameras(): Promise<CameraInfo[]>;
    protected renderSpinner(color: string): React.JSX.Element;
    setTorchState(enabled: boolean): Promise<void>;
    getCapabilities(): MediaTrackCapabilities | undefined;
}
