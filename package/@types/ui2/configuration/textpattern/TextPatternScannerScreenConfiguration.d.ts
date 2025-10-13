import { ActionBarConfiguration } from "../common/ActionBarConfiguration";
import { CameraConfiguration } from "../common/CameraConfiguration";
import { CameraPermissionScreen } from "../common/CameraPermission";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { IconButton } from "../common/Common";
import { Palette } from "../common/Common";
import { PermanentViewFinderConfiguration } from "../common/ViewFinderConfiguration";
import { ScanCompletionOverlay } from "../common/ScanCompletionOverlay";
import { ScanbotAlertDialog } from "../common/ScanbotAlertDialog";
import { Sound } from "../common/Common";
import { TextPatternScannerConfiguration } from "../TextPatternScannerTypes";
import { TextPatternScannerIntroScreenConfiguration } from "../textpattern/TextPatternScannerIntroScreenConfiguration";
import { TextPatternScannerScreenTextLocalization } from "../textpattern/TextPatternScannerScreenTextLocalization";
import { TopBarConfiguration } from "../common/TopBarConfiguration";
import { UserGuidanceConfiguration } from "../common/UserGuidanceConfiguration";
import { Vibration } from "../common/Common";
/**
Configuration of the screen for detecting generic text data.
*/
export declare class TextPatternScannerScreenConfiguration extends PartiallyConstructible {
    /**
      Version number of the configuration object.
      @defaultValue "1.0";
      */
    readonly version: string;
    /**
      The configuration object should be applied for this screen.
      @defaultValue "TextPatternScanner";
      */
    readonly screen: string;
    /**
      Configuration of the all strings for generic text scanner screen.
      @defaultValue new TextPatternScannerScreenTextLocalization({});
      */
    localization: TextPatternScannerScreenTextLocalization;
    /**
      Define the screen's base color values from which other colors are derived.
      @defaultValue new Palette({});
      */
    palette: Palette;
    /**
      The background color of the generic text scanner screen.
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
      Configuration of the user guidance below finder view.
      @defaultValue new UserGuidanceConfiguration({
          "title": new StyledText({
              "text": "?finderViewUserGuidance"
          })
      });
      */
    finderViewUserGuidance: UserGuidanceConfiguration;
    /**
      Configuration of the top bar on the generic text scanner screen.
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
      Configuration of the introduction screen for the generic text scanner screen.
      @defaultValue new TextPatternScannerIntroScreenConfiguration({});
      */
    introScreen: TextPatternScannerIntroScreenConfiguration;
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
              "width": 3.85,
              "height": 1.0
          }),
          "preferredHeight": 48.0
      });
      */
    viewFinder: PermanentViewFinderConfiguration;
    /**
      Configuration of the scanner.
      @defaultValue new TextPatternScannerConfiguration({});
      */
    scannerConfiguration: TextPatternScannerConfiguration;
    /**
      Whether word boxes should be displayed or not.
      @defaultValue true;
      */
    shouldShowWordBoxes: boolean;
    /**
      The color of word boxes filling. Works best with an alpha < 0.5.
      @defaultValue "#33CCE54C";
      */
    wordBoxesFillColor: string;
    /**
      The color of word boxes border lines.
      @defaultValue "#33CCE599";
      */
    wordBoxesLineColor: string;
    /**
      If the confirmation alert dialog is enabled.
      @defaultValue false;
      */
    confirmationAlertDialogEnabled: boolean;
    /**
      Configuration of the confirmation alert dialog.
      @defaultValue new ScanbotAlertDialog({
          "title": new StyledText({
              "text": "?textPatternConfirmationAlertTitle",
              "color": "?sbColorOnSurface"
          }),
          "subtitle": new StyledText({
              "color": "?sbColorOnSurfaceVariant"
          }),
          "sheetColor": "?sbColorSurface",
          "modalOverlayColor": "?sbColorModalOverlay",
          "dividerColor": "?sbColorOutline",
          "okButton": new ButtonConfiguration({
              "visible": true,
              "text": "?textPatternConfirmationAlertSubmitButton",
              "accessibilityDescription": "?accessibilityDescriptionConfirmationSubmitButton",
              "background": new BackgroundStyle({
                  "strokeColor": "?sbColorPrimary",
                  "fillColor": "?sbColorPrimary",
                  "strokeWidth": 1.0
              }),
              "foreground": new ForegroundStyle({
                  "iconVisible": true,
                  "color": "?sbColorOnPrimary",
                  "useShadow": false
              })
          }),
          "cancelButton": new ButtonConfiguration({
              "visible": true,
              "text": "?textPatternConfirmationAlertCancelButton",
              "accessibilityDescription": "?accessibilityDescriptionConfirmationCancelButton",
              "background": new BackgroundStyle({
                  "strokeColor": "#00000000",
                  "fillColor": "#00000000",
                  "strokeWidth": 1.0
              }),
              "foreground": new ForegroundStyle({
                  "iconVisible": false,
                  "color": "?sbColorPrimary",
                  "useShadow": false
              })
          })
      });
      */
    confirmationAlertDialog: ScanbotAlertDialog;
    /**
      Configuration of the result overlay.
      @defaultValue new ScanCompletionOverlay({});
      */
    successOverlay: ScanCompletionOverlay;
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
    /** @param source {@displayType `DeepPartial<TextPatternScannerScreenConfiguration>`} */
    constructor(source?: DeepPartial<TextPatternScannerScreenConfiguration>);
}
