import { DeepPartial, PartiallyConstructible } from "../utils";
import { StyledText } from "../common/Common";
/**
Configuration of the overlay to be shown after the successful scan.
*/
export declare class ScanCompletionOverlay extends PartiallyConstructible {
    /**
      A caption below the icon.
      @defaultValue new StyledText({
          "text": "?completionOverlaySuccessMessage",
          "color": "?sbColorOnPrimary"
      });
      */
    message: StyledText;
    /**
      Color of the icon.
      @defaultValue "?sbColorOnPrimary";
      */
    iconColor: string;
    /**
      Background color of the overlay.
      @defaultValue "?sbColorSurfaceHigh";
      */
    overlayBackgroundColor: string;
    /**
      Timeout in milliseconds after which the overlay is automatically dismissed.
      @defaultValue 1000;
      */
    timeout: number;
    /** @param source {@displayType `DeepPartial<ScanCompletionOverlay>`} */
    constructor(source?: DeepPartial<ScanCompletionOverlay>);
}
