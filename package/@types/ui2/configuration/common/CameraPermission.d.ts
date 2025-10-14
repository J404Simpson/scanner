import { ButtonConfiguration } from "../common/Common";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { IconStyle } from "../common/Common";
import { StyledText } from "../common/Common";
/**
Configuration of the camera permission request view.
*/
export declare class CameraPermissionScreen extends PartiallyConstructible {
    /**
      The background color of the camera permission request.
      @defaultValue "?sbColorSurface";
      */
    background: string;
    /**
      The background color of the icon used in the camera permission request.
      @defaultValue "?sbColorOutline";
      */
    iconBackground: string;
    /**
      Configuration of the icon used in the camera permission request.
      @defaultValue new IconStyle({
          "color": "?sbColorOnSurface"
      });
      */
    icon: IconStyle;
    /**
      Configuration of the camera permission request's close button.
      @defaultValue new ButtonConfiguration({
          "text": "?cameraPermissionCloseButton",
          "background": new BackgroundStyle({
              "strokeColor": "#00000000",
              "fillColor": "#00000000",
              "strokeWidth": 0.0
          }),
          "foreground": new ForegroundStyle({
              "iconVisible": false,
              "color": "?sbColorPrimary"
          })
      });
      */
    closeButton: ButtonConfiguration;
    /**
      Configuration of the camera permission request's title.
      @defaultValue new StyledText({
          "text": "?cameraPermissionEnableCameraTitle",
          "color": "?sbColorOnSurface"
      });
      */
    enableCameraTitle: StyledText;
    /**
      Configuration of the camera permission request's explanatory text.
      @defaultValue new StyledText({
          "text": "?cameraPermissionEnableCameraExplanation",
          "color": "?sbColorOnSurfaceVariant"
      });
      */
    enableCameraExplanation: StyledText;
    /** @param source {@displayType `DeepPartial<CameraPermissionScreen>`} */
    constructor(source?: DeepPartial<CameraPermissionScreen>);
}
