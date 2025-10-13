import { BackgroundStyle } from "../common/Common";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { IconStyle } from "../common/Common";
import { StyledText } from "../common/Common";
/**
Configuration of the hint guiding users through the scanning process.
*/
export declare class UserGuidanceConfiguration extends PartiallyConstructible {
    /**
      Determines whether the user guidance is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The title of the user guidance.
      @defaultValue new StyledText({
          "color": "?sbColorOnPrimary"
      });
      */
    title: StyledText;
    /**
      The background style used for the user guidance.
      @defaultValue new BackgroundStyle({
          "strokeColor": "#00000000",
          "fillColor": "?sbColorSurfaceLow"
      });
      */
    background: BackgroundStyle;
    /** @param source {@displayType `DeepPartial<UserGuidanceConfiguration>`} */
    constructor(source?: DeepPartial<UserGuidanceConfiguration>);
}
/**
Configuration of the hint (containing an icon) guiding users through the scanning process.
*/
export declare class IconUserGuidanceConfiguration extends PartiallyConstructible {
    /**
      Determines whether the user guidance is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      Configuration of the icon appearance.
      @defaultValue new IconStyle({
          "color": "?sbColorOnPrimary"
      });
      */
    icon: IconStyle;
    /**
      The title of the user guidance.
      @defaultValue new StyledText({
          "color": "?sbColorOnPrimary"
      });
      */
    title: StyledText;
    /**
      Configuration of the background appearance for the user guidance hints.
      @defaultValue new BackgroundStyle({
          "fillColor": "?sbColorSurfaceLow"
      });
      */
    background: BackgroundStyle;
    /** @param source {@displayType `DeepPartial<IconUserGuidanceConfiguration>`} */
    constructor(source?: DeepPartial<IconUserGuidanceConfiguration>);
}
