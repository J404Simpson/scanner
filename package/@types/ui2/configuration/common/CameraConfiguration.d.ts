import { DeepPartial, PartiallyConstructible } from "../utils";
/**
The ideal resolution of the camera preview.
*/
export declare class Resolution extends PartiallyConstructible {
    /**
      Width of the resolution.
      */
    width: number;
    /**
      Height of the resolution.
      */
    height: number;
    /** @param source {@displayType `DeepPartial<Resolution>`} */
    constructor(source?: DeepPartial<Resolution>);
}
/**
Determines which camera module to use on start-up.

- `FRONT`:
   Use the front camera.
- `BACK`:
   Use the default back camera.
*/
export type CameraModule = "FRONT" | "BACK";
export declare const CameraModuleValues: CameraModule[];
/**
Configuration of the camera settings to be used while scanning.
*/
export declare class CameraConfiguration extends PartiallyConstructible {
    /**
      Determines which camera module to use on start-up.
      @defaultValue "BACK";
      */
    cameraModule: CameraModule;
    /**
      The zoom steps available to the user.
      @defaultValue [1.0, 2.0, 5.0];
      */
    zoomSteps: number[];
    /**
      The default zoom factor on start-up.
      @defaultValue 1.0;
      */
    defaultZoomFactor: number;
    /**
      Determines whether the flash is enabled on start-up.
      @defaultValue false;
      */
    flashEnabled: boolean;
    /**
      The ideal resolution for the camera preview. Actual resolution may vary depending on browser and device capabilities.
      @defaultValue new Resolution({
          "width": 1920,
          "height": 1080
      });
      */
    idealPreviewResolution: Resolution;
    /** @param source {@displayType `DeepPartial<CameraConfiguration>`} */
    constructor(source?: DeepPartial<CameraConfiguration>);
}
