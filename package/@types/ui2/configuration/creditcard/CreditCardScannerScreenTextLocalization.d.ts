import { DeepPartial, PartiallyConstructible } from "../utils";
/**
Configuration of the all strings for credit card scanner screen.
*/
export declare class CreditCardScannerScreenTextLocalization extends PartiallyConstructible {
    /**
      Title for the top bar.
      @defaultValue "Credit Card Scanner";
      */
    topBarTitle: string;
    /**
      Cancel button text for the top bar.
      @defaultValue "Cancel";
      */
    topBarCancelButton: string;
    /**
      Text for the top user guidance caption.
      @defaultValue "Scan the credit card";
      */
    topUserGuidance: string;
    /**
      Title for the introduction screen.
      @defaultValue "How to scan a credit card";
      */
    introScreenTitle: string;
    /**
      Start scanning button text for the introduction screen.
      @defaultValue "Start Scanning";
      */
    introScreenDoneButton: string;
    /**
      The text explanation of the introduction screen.
      @defaultValue "To quickly and securely input your credit card details, please hold your device over the credit card, so that the camera aligns with the numbers on the front of the card. \n\nThe scanner will guide you to the optimal scanning position. Once the scan is complete, your card details will automatically be extracted and processed.\n\nPress 'Start Scanning' to begin.";
      */
    introScreenText: string;
    /**
      Caption for the success overlay.
      @defaultValue "Scanned successfully";
      */
    completionOverlaySuccessMessage: string;
    /**
      Caption for the success overlay when not all data from the card was scanned.
      @defaultValue "Incomplete scan";
      */
    completionOverlayIncompleteDataMessage: string;
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
      The user guidance text displayed when no credit card is found.
      @defaultValue "Looking for credit card...";
      */
    creditCardUserGuidanceNoCardFound: string;
    /**
      The user guidance text displayed when a card presence was detected.
      @defaultValue "Scanning the credit card...";
      */
    creditCardUserGuidanceScanningProgress: string;
    /**
      The user guidance text displayed when it is too dark to capture an adequate image.
      @defaultValue "Too dark. Please turn on a light.";
      */
    creditCardUserGuidanceTooDark: string;
    /**
      The user guidance text displayed when the detected card is too far away and appears too small.
      @defaultValue "Please move closer to the credit card.";
      */
    creditCardUserGuidanceTooSmall: string;
    /**
      The user guidance text displayed when the detected card is not in a good perspective (device tilted).
      @defaultValue "Please hold your device straight over the credit card.";
      */
    creditCardUserGuidanceBadPerspective: string;
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
    /** @param source {@displayType `DeepPartial<CreditCardScannerScreenTextLocalization>`} */
    constructor(source?: DeepPartial<CreditCardScannerScreenTextLocalization>);
}
