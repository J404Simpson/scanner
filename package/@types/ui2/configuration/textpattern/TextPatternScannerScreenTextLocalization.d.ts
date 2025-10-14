import { DeepPartial, PartiallyConstructible } from "../utils";
/**
Configuration of the all strings for generic text scanner screen.
*/
export declare class TextPatternScannerScreenTextLocalization extends PartiallyConstructible {
    /**
      Title for the top bar.
      @defaultValue "Text Scanner";
      */
    topBarTitle: string;
    /**
      Cancel button text for the top bar.
      @defaultValue "Cancel";
      */
    topBarCancelButton: string;
    /**
      Text for the top user guidance caption.
      @defaultValue "Locate the text you are looking for";
      */
    topUserGuidance: string;
    /**
      Text for the user guidance caption below the finder view.
      @defaultValue "Scanning for text pattern...";
      */
    finderViewUserGuidance: string;
    /**
      Title for the introduction screen.
      @defaultValue "How to scan text";
      */
    introScreenTitle: string;
    /**
      Start scanning button text for the introduction screen.
      @defaultValue "Start Scanning";
      */
    introScreenDoneButton: string;
    /**
      The text explanation for the introduction screen.
      @defaultValue "To scan a single line of text, please hold your device so that the camera viewfinder clearly captures the text you want to scan. Please ensure the text is properly aligned. Once the scan is complete, the text will be automatically extracted.\n\nPress 'Start Scanning' to begin.";
      */
    introScreenText: string;
    /**
      Caption for the success overlay.
      @defaultValue "Scanned successfully";
      */
    completionOverlaySuccessMessage: string;
    /**
      Accessibility description for the 'open introduction screen' button in top bar.
      @defaultValue "Open introduction screen.";
      */
    accessibilityDescriptionOpenIntroScreenButton: string;
    /**
      Accessibility description for the 'done'/'start scanning' button in the introduction screen.
      @defaultValue "Start scanning";
      */
    accessibilityDescriptionIntroScreenDoneButton: string;
    /**
      Accessibility description for the 'cancel' button in the top bar.
      @defaultValue "Cancel";
      */
    accessibilityDescriptionCancelButton: string;
    /**
      Title for the text pattern confirmation alert.
      @defaultValue "Text Detected!";
      */
    textPatternConfirmationAlertTitle: string;
    /**
      Cancel button text for the text pattern confirmation alert.
      @defaultValue "Retry";
      */
    textPatternConfirmationAlertCancelButton: string;
    /**
      Submit button text for the text pattern confirmation alert.
      @defaultValue "Submit";
      */
    textPatternConfirmationAlertSubmitButton: string;
    /**
      Accessibility description for the cancel button in the text pattern confirmation alert.
      @defaultValue "Retry";
      */
    accessibilityDescriptionConfirmationCancelButton: string;
    /**
      Accessibility description for the submit button in the text pattern confirmation alert.
      @defaultValue "Submit";
      */
    accessibilityDescriptionConfirmationSubmitButton: string;
    /**
      Accessibility description for the flash button.
      @defaultValue "Toggle flash";
      */
    accessibilityDescriptionFlashButton: string;
    /**
      Accessibility description for the zoom button.
      @defaultValue "Toggle camera zoom";
      */
    accessibilityDescriptionZoomButton: string;
    /**
      Accessibility description for the flip camera button.
      @defaultValue "Flip camera";
      */
    accessibilityDescriptionFlipCameraButton: string;
    /**
      The title of the camera permission dialog.
      @defaultValue "Camera permission denied!";
      */
    cameraPermissionEnableCameraTitle: string;
    /**
      The explanation text of the camera permission dialog.
      @defaultValue "Please allow the usage of the camera to start the scanning process.";
      */
    cameraPermissionEnableCameraExplanation: string;
    /**
      The 'enable' button title of the camera permission dialog.
      @defaultValue "Grant permission";
      */
    cameraPermissionEnableCameraButton: string;
    /**
      The 'close' button title of the camera permission dialog.
      @defaultValue "Close";
      */
    cameraPermissionCloseButton: string;
    /**
      The accessibility hint for the 'enable' button of the camera permission dialog.
      @defaultValue "Tap to grant camera permission";
      */
    accessibilityDescriptionCameraPermissionEnableCameraButton: string;
    /**
      The accessibility hint for the 'close' button of the camera permission dialog.
      @defaultValue "Close screen without granting permission";
      */
    accessibilityDescriptionCameraPermissionCloseButton: string;
    /** @param source {@displayType `DeepPartial<TextPatternScannerScreenTextLocalization>`} */
    constructor(source?: DeepPartial<TextPatternScannerScreenTextLocalization>);
}
