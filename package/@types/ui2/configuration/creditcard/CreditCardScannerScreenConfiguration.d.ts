import { ActionBarConfiguration } from "../common/ActionBarConfiguration";
import { CameraConfiguration } from "../common/CameraConfiguration";
import { CameraPermissionScreen } from "../common/CameraPermission";
import { CreditCardScanGuidanceConfiguration } from "../creditcard/CreditCardScannerUserGuidance";
import { CreditCardScannerConfiguration } from "../CreditCardTypes";
import { CreditCardScannerIntroScreenConfiguration } from "../creditcard/CreditCardScannerIntroScreenConfiguration";
import { CreditCardScannerScreenTextLocalization } from "../creditcard/CreditCardScannerScreenTextLocalization";
import { CreditCardScanningProgressConfiguration } from "../creditcard/CreditCardScanningProgressConfiguration";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { IconButton } from "../common/Common";
import { Palette } from "../common/Common";
import { PermanentViewFinderConfiguration } from "../common/ViewFinderConfiguration";
import { ScanCompletionOverlay } from "../common/ScanCompletionOverlay";
import { Sound } from "../common/Common";
import { TopBarConfiguration } from "../common/TopBarConfiguration";
import { UserGuidanceConfiguration } from "../common/UserGuidanceConfiguration";
import { Vibration } from "../common/Common";
/**
Configuration of the screen for detecting credit card data.
*/
export declare class CreditCardScannerScreenConfiguration extends PartiallyConstructible {
    /**
      Version number of the configuration object.
      @defaultValue "1.0";
      */
    readonly version: string;
    /**
      The configuration object should be applied for this screen.
      @defaultValue "CreditCardScanner";
      */
    readonly screen: string;
    /**
      Configuration of the all strings for credit card scanner screen.
      @defaultValue new CreditCardScannerScreenTextLocalization({});
      */
    localization: CreditCardScannerScreenTextLocalization;
    /**
      Define the screen's base color values from which other colors are derived.
      @defaultValue new Palette({});
      */
    palette: Palette;
    /**
      The background color of the credit card scanner screen.
      @defaultValue "?sbColorSurfaceLow";
      */
    backgroundColor: string;
    /**
      Configuration of the camera behavior.
      @defaultValue new CameraConfiguration({});
      */
    cameraConfiguration: CameraConfiguration;
    /**
      Configuration of the dialog for requesting camera permissions.
      @defaultValue new CameraPermissionScreen({
          "background": "?sbColorSurface",
          "iconBackground": "?sbColorOutline",
          "icon": new IconStyle({
              "visible": true,
              "color": "?sbColorOnSurface"
          }),
          "closeButton": new ButtonConfiguration({
              "visible": true,
              "text": "?cameraPermissionCloseButton",
              "accessibilityDescription": "?accessibilityDescriptionCameraPermissionCloseButton",
              "background": new BackgroundStyle({
                  "strokeColor": "#00000000",
                  "fillColor": "#00000000",
                  "strokeWidth": 0.0
              }),
              "foreground": new ForegroundStyle({
                  "iconVisible": false,
                  "color": "?sbColorPrimary",
                  "useShadow": false
              })
          }),
          "enableCameraTitle": new StyledText({
              "text": "?cameraPermissionEnableCameraTitle",
              "color": "?sbColorOnSurface"
          }),
          "enableCameraExplanation": new StyledText({
              "text": "?cameraPermissionEnableCameraExplanation",
              "color": "?sbColorOnSurfaceVariant"
          })
      });
      */
    cameraPermission: CameraPermissionScreen;
    /**
      Configuration of the top user guidance.
      @defaultValue new UserGuidanceConfiguration({
          "title": new StyledText({
              "text": "?topUserGuidance"
          })
      });
      */
    topUserGuidance: UserGuidanceConfiguration;
    /**
      Configuration of the user guidance for the scanning status.
      @defaultValue new CreditCardScanGuidanceConfiguration({});
      */
    scanStatusUserGuidance: CreditCardScanGuidanceConfiguration;
    /**
      Configuration of the top bar on the credit card scanner screen.
      @defaultValue new TopBarConfiguration({
          "title": new StyledText({
              "visible": true,
              "text": "?topBarTitle"
          }),
          "cancelButton": new ButtonConfiguration({
              "text": "?topBarCancelButton",
              "accessibilityDescription": "?accessibilityDescriptionCancelButton",
              "background": new BackgroundStyle({
                  "strokeColor": "#00000000",
                  "fillColor": "#00000000",
                  "strokeWidth": 0.0
              }),
              "foreground": new ForegroundStyle({
                  "color": "?sbColorOnPrimary"
              })
          })
      });
      */
    topBar: TopBarConfiguration;
    /**
      Configuration of the button in the top bar that opens the introduction screen.
      @defaultValue new IconButton({
          "color": "?sbColorOnPrimary",
          "accessibilityDescription": "?accessibilityDescriptionOpenIntroScreenButton"
      });
      */
    topBarOpenIntroScreenButton: IconButton;
    /**
      Configuration of the introduction screen for the credit card scanner.
      @defaultValue new CreditCardScannerIntroScreenConfiguration({});
      */
    introScreen: CreditCardScannerIntroScreenConfiguration;
    /**
      Configuration of the action bar.
      @defaultValue new ActionBarConfiguration({
          "flipCameraButton": new RoundButton({
              "visible": false,
              "accessibilityDescription": "?accessibilityDescriptionFlipCameraButton",
              "backgroundColor": "?sbColorSurfaceHigh",
              "foregroundColor": "?sbColorOnPrimary",
              "activeBackgroundColor": "?sbColorWarning",
              "activeForegroundColor": "#1C1B1F"
          })
      });
      */
    actionBar: ActionBarConfiguration;
    /**
      Configuration of the view finder.
      @defaultValue new PermanentViewFinderConfiguration({
          "style": new FinderCorneredStyle({
              "strokeColor": "?sbColorSurface",
              "strokeWidth": 2.0
          }),
          "aspectRatio": new AspectRatio({
              "width": 1.586,
              "height": 1.0
          }),
          "minimumInsets": new EdgeInsets({
              "top": 24.0,
              "left": 24.0,
              "bottom": 24.0,
              "right": 24.0
          })
      });
      */
    viewFinder: PermanentViewFinderConfiguration;
    /**
      Configuration for the credit card recognizer.
      @defaultValue new CreditCardScannerConfiguration({});
      */
    scannerConfiguration: CreditCardScannerConfiguration;
    /**
      Flag to show or hide the preset button.
      @defaultValue true;
      */
    exampleOverlayVisible: boolean;
    /**
      Configuration of visualization of the scanning progress.
      @defaultValue new CreditCardScanningProgressConfiguration({});
      */
    scanningProgress: CreditCardScanningProgressConfiguration;
    /**
      Timeout for the scan process. If the scan process takes longer than this value, the incomplete result will be returned.
      @defaultValue 500;
      */
    scanIncompleteDataTimeout: number;
    /**
      Configuration of the success overlay.
      @defaultValue new ScanCompletionOverlay({});
      */
    successOverlay: ScanCompletionOverlay;
    /**
      Configuration of the success overlay.
      @defaultValue new ScanCompletionOverlay({
          "message": new StyledText({
              "text": "?completionOverlayIncompleteDataMessage"
          })
      });
      */
    incompleteDataOverlay: ScanCompletionOverlay;
    /**
      Configuration of the scan confirmation sound.
      @defaultValue new Sound({});
      */
    sound: Sound;
    /**
      Configuration of the vibration feedback.
      @defaultValue new Vibration({});
      */
    vibration: Vibration;
    /** @param source {@displayType `DeepPartial<CreditCardScannerScreenConfiguration>`} */
    constructor(source?: DeepPartial<CreditCardScannerScreenConfiguration>);
}
