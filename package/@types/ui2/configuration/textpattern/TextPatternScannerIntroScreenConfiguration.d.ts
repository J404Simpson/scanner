import { ButtonConfiguration } from "../common/Common";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { StyledText } from "../common/Common";
/**
The image for the introduction screen of a generic text scanner screen.
*/
export type TextPatternScannerIntroImage = TextPatternIntroMeterDevice | TextPatternIntroShippingContainer | TextPatternIntroNoImage | TextPatternIntroCustomImage;
/** @internal */
export declare namespace TextPatternScannerIntroImage {
    /** @internal */
    function From(source: {
        [key: string]: any;
    }): TextPatternScannerIntroImage;
}
/**
The image for the introduction screen featuring an electricity meter.
*/
export declare class TextPatternIntroMeterDevice extends PartiallyConstructible {
    readonly _type: "TextPatternIntroMeterDevice";
    /** @param source {@displayType `DeepPartial<TextPatternIntroMeterDevice>`} */
    constructor(source?: DeepPartial<TextPatternIntroMeterDevice>);
}
/**
The image for the introduction screen showing a text on a shipping container.
*/
export declare class TextPatternIntroShippingContainer extends PartiallyConstructible {
    readonly _type: "TextPatternIntroShippingContainer";
    /** @param source {@displayType `DeepPartial<TextPatternIntroShippingContainer>`} */
    constructor(source?: DeepPartial<TextPatternIntroShippingContainer>);
}
/**
No image for the introduction screen.
*/
export declare class TextPatternIntroNoImage extends PartiallyConstructible {
    readonly _type: "TextPatternIntroNoImage";
    /** @param source {@displayType `DeepPartial<TextPatternIntroNoImage>`} */
    constructor(source?: DeepPartial<TextPatternIntroNoImage>);
}
/**
A custom image for the introduction screen.
*/
export declare class TextPatternIntroCustomImage extends PartiallyConstructible {
    readonly _type: "TextPatternIntroCustomImage";
    /**
      The web or file URI to the image.
      */
    uri: string;
    /** @param source {@displayType `DeepPartial<TextPatternIntroCustomImage>`} */
    constructor(source?: DeepPartial<TextPatternIntroCustomImage>);
}
/**
Configuration of the introduction screen for the generic text scanner.
*/
export declare class TextPatternScannerIntroScreenConfiguration extends PartiallyConstructible {
    /**
      The image for the introduction screen.
      @defaultValue new TextPatternIntroMeterDevice({});
      */
    image: TextPatternScannerIntroImage;
    /**
      The background color of the introduction screen.
      @defaultValue "?sbColorSurface";
      */
    backgroundColor: string;
    /**
      The divider color of the introduction screen.
      @defaultValue "?sbColorOutline";
      */
    dividerColor: string;
    /**
      The handle color of the introduction screen.
      @defaultValue "?sbColorOutline";
      */
    handlerColor: string;
    /**
      Determines whether the introduction screen should automatically be shown or not when the scanning session starts.
      @defaultValue false;
      */
    showAutomatically: boolean;
    /**
      The title of the introduction screen, located in the top bar.
      @defaultValue new StyledText({
          "text": "?introScreenTitle",
          "color": "?sbColorOnSurface"
      });
      */
    title: StyledText;
    /**
      The text explanation of the introduction screen.
      @defaultValue new StyledText({
          "text": "?introScreenText",
          "color": "?sbColorOnSurface"
      });
      */
    text: StyledText;
    /**
      Configuration of the 'Done' / 'Start scanning' button.
      @defaultValue new ButtonConfiguration({
          "text": "?introScreenDoneButton",
          "accessibilityDescription": "?accessibilityDescriptionIntroScreenDoneButton",
          "background": new BackgroundStyle({
              "strokeColor": "#00000000",
              "fillColor": "?sbColorPrimary",
              "strokeWidth": 0.0
          }),
          "foreground": new ForegroundStyle({
              "color": "?sbColorOnPrimary"
          })
      });
      */
    doneButton: ButtonConfiguration;
    /** @param source {@displayType `DeepPartial<TextPatternScannerIntroScreenConfiguration>`} */
    constructor(source?: DeepPartial<TextPatternScannerIntroScreenConfiguration>);
}
