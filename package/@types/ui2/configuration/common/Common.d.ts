import { DeepPartial, PartiallyConstructible } from "../utils";
/**
Value palette describing the colors of the scanner screens.
*/
export declare class Palette extends PartiallyConstructible {
    /**
      The primary color used for enabled elements.
      @defaultValue "#C8193C";
      */
    sbColorPrimary: string;
    /**
      The primary color used for disabled elements.
      @defaultValue "#F5F5F5";
      */
    sbColorPrimaryDisabled: string;
    /**
      The color used to convey a negative meaning.
      @defaultValue "#FF3737";
      */
    sbColorNegative: string;
    /**
      The color used to convey a positive meaning.
      @defaultValue "#4EFFB4";
      */
    sbColorPositive: string;
    /**
      The color used to convey warnings.
      @defaultValue "#FFCE5C";
      */
    sbColorWarning: string;
    /**
      The secondary color used for enabled elements.
      @defaultValue "#FFEDEE";
      */
    sbColorSecondary: string;
    /**
      The secondary color used for disabled elements.
      @defaultValue "#F5F5F5";
      */
    sbColorSecondaryDisabled: string;
    /**
      The color used for displaying elements on top of the primary color.
      @defaultValue "#FFFFFF";
      */
    sbColorOnPrimary: string;
    /**
      The color used for displaying elements on top of the secondary color.
      @defaultValue "#C8193C";
      */
    sbColorOnSecondary: string;
    /**
      The color used for surfaces.
      @defaultValue "#FFFFFF";
      */
    sbColorSurface: string;
    /**
      The color used for outlines.
      @defaultValue "#EFEFEF";
      */
    sbColorOutline: string;
    /**
      The alternative color used on top of surfaces.
      @defaultValue "#707070";
      */
    sbColorOnSurfaceVariant: string;
    /**
      The color used on top of surfaces.
      @defaultValue "#000000";
      */
    sbColorOnSurface: string;
    /**
      The color with a low alpha (transparency) value used for certain surfaces.
      @defaultValue "#00000026";
      */
    sbColorSurfaceLow: string;
    /**
      The color with a high alpha (transparency) value used for certain surfaces.
      @defaultValue "#0000007A";
      */
    sbColorSurfaceHigh: string;
    /**
      The color with a very high alpha (transparency) value used to fill certain overlays.
      @defaultValue "#000000A3";
      */
    sbColorModalOverlay: string;
    /** @param source {@displayType `DeepPartial<Palette>`} */
    constructor(source?: DeepPartial<Palette>);
}
/**
Configuration of the text field appearance.
*/
export declare class StyledText extends PartiallyConstructible {
    /**
      Determines whether the text field is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The value of the text field.
      @defaultValue "";
      */
    text: string;
    /**
      The text color.
      @defaultValue "#FFFFFF";
      */
    color: string;
    /**
      Determines whether to enable drop shadows for the text.
      @defaultValue false;
      */
    useShadow: boolean;
    /** @param source {@displayType `DeepPartial<StyledText>`} */
    constructor(source?: DeepPartial<StyledText>);
}
/**
Configuration of the icon appearance.
*/
export declare class IconStyle extends PartiallyConstructible {
    /**
      Determines whether the icon is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The icon color.
      @defaultValue "#FFFFFF";
      */
    color: string;
    /** @param source {@displayType `DeepPartial<IconStyle>`} */
    constructor(source?: DeepPartial<IconStyle>);
}
/**
Configuration of the icon appearance on a button.
*/
export declare class IconButton extends PartiallyConstructible {
    /**
      Determines whether the icon is visible on the button.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The icon color.
      @defaultValue "#FFFFFF";
      */
    color: string;
    /**
      The text to be read when the button is selected through accessibility mode.
      @defaultValue "";
      */
    accessibilityDescription: string;
    /** @param source {@displayType `DeepPartial<IconButton>`} */
    constructor(source?: DeepPartial<IconButton>);
}
/**
Configuration of the polygon appearance.
*/
export declare class PolygonStyle extends PartiallyConstructible {
    /**
      The color of the polygon outline.
      @defaultValue "#FFFFFFFF";
      */
    strokeColor: string;
    /**
      The fill color of the polygon.
      @defaultValue "#FFFFFF30";
      */
    fillColor: string;
    /**
      The width of the polygon outline in dp.
      @defaultValue 2.0;
      */
    strokeWidth: number;
    /**
      The corner radius of the polygon in dp.
      @defaultValue 0.0;
      */
    cornerRadius: number;
    /** @param source {@displayType `DeepPartial<PolygonStyle>`} */
    constructor(source?: DeepPartial<PolygonStyle>);
}
/**
Configuration of the background appearance for buttons and hints.
*/
export declare class BackgroundStyle extends PartiallyConstructible {
    /**
      The color of the outline.
      @defaultValue "#FFFFFFFF";
      */
    strokeColor: string;
    /**
      The fill color.
      @defaultValue "#FFFFFF30";
      */
    fillColor: string;
    /**
      The width of the outline in dp.
      @defaultValue 2.0;
      */
    strokeWidth: number;
    /** @param source {@displayType `DeepPartial<BackgroundStyle>`} */
    constructor(source?: DeepPartial<BackgroundStyle>);
}
/**
Configuration of the appearance for foreground elements (e.g. text and/or icons, etc).
*/
export declare class ForegroundStyle extends PartiallyConstructible {
    /**
      Determines whether the icon is visible or not.
      @defaultValue true;
      */
    iconVisible: boolean;
    /**
      The color used for foreground elements.
      @defaultValue "#FFFFFF";
      */
    color: string;
    /**
      Determines whether to use drop shadows for foreground elements.
      @defaultValue false;
      */
    useShadow: boolean;
    /** @param source {@displayType `DeepPartial<ForegroundStyle>`} */
    constructor(source?: DeepPartial<ForegroundStyle>);
}
/**
Configuration of the badge.
*/
export declare class BadgeStyle extends PartiallyConstructible {
    /**
      Determines whether the badge is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      Configuration of the background appearance for the badge.
      @defaultValue new BackgroundStyle({});
      */
    background: BackgroundStyle;
    /**
      The color of the badge's foreground (icon, text).
      @defaultValue "?sbColorOnSurface";
      */
    foregroundColor: string;
    /** @param source {@displayType `DeepPartial<BadgeStyle>`} */
    constructor(source?: DeepPartial<BadgeStyle>);
}
/**
Configuration of the round button.
*/
export declare class RoundButton extends PartiallyConstructible {
    /**
      Determines whether the button is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The text to be read when the button is selected through accessibility mode.
      @defaultValue "";
      */
    accessibilityDescription: string;
    /**
      The color of the button's background.
      @defaultValue "#0000007A";
      */
    backgroundColor: string;
    /**
      The color of the button's foreground (icon, text).
      @defaultValue "#FFFFFF";
      */
    foregroundColor: string;
    /**
      The color of the button's background when the button is active (selected, toggled).
      @defaultValue "#FFCE5C";
      */
    activeBackgroundColor: string;
    /**
      The color of the button's foreground (icon, text) when the button is active (selected, toggled).
      @defaultValue "#1C1B1F";
      */
    activeForegroundColor: string;
    /** @param source {@displayType `DeepPartial<RoundButton>`} */
    constructor(source?: DeepPartial<RoundButton>);
}
/**
Configuration of the button with a badge.
*/
export declare class BadgedButton extends PartiallyConstructible {
    /**
      The color of the badge's background.
      @defaultValue "#FFFFFF";
      */
    badgeBackgroundColor: string;
    /**
      The color of the badge's foreground (icon, text).
      @defaultValue "#C8193C";
      */
    badgeForegroundColor: string;
    /**
      Determines whether the button is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The color of the button's background.
      @defaultValue "#0000007A";
      */
    backgroundColor: string;
    /**
      The color of the button's foreground (icon, text).
      @defaultValue "#FFFFFF";
      */
    foregroundColor: string;
    /**
      The color of the button's background when the button is active (selected, toggled).
      @defaultValue "#FFCE5C";
      */
    activeBackgroundColor: string;
    /**
      The color of the button's foreground (icon, text) when the button is active (selected, toggled).
      @defaultValue "#1C1B1F";
      */
    activeForegroundColor: string;
    /** @param source {@displayType `DeepPartial<BadgedButton>`} */
    constructor(source?: DeepPartial<BadgedButton>);
}
/**
Configuration of the button.
*/
export declare class ButtonConfiguration extends PartiallyConstructible {
    /**
      Determines whether the button is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The text to be displayed on the button.
      @defaultValue "";
      */
    text: string;
    /**
      The text to be read when the button is selected through accessibility mode.
      @defaultValue "";
      */
    accessibilityDescription: string;
    /**
      Configuration of the background appearance for the button.
      @defaultValue new BackgroundStyle({});
      */
    background: BackgroundStyle;
    /**
      Configuration of the appearance for foreground elements (e.g. text and/or icons, etc) of the button.
      @defaultValue new ForegroundStyle({});
      */
    foreground: ForegroundStyle;
    /** @param source {@displayType `DeepPartial<ButtonConfiguration>`} */
    constructor(source?: DeepPartial<ButtonConfiguration>);
}
/**
Configuration for the popup menu items.
*/
export declare class PopupMenuItem extends PartiallyConstructible {
    /**
      The text to be displayed on the button.
      @defaultValue new StyledText({});
      */
    title: StyledText;
    /**
      The text to be read when the button is selected through accessibility mode.
      @defaultValue "";
      */
    accessibilityDescription: string;
    /**
      Configuration of the icon appearance.
      @defaultValue new IconStyle({});
      */
    icon: IconStyle;
    /** @param source {@displayType `DeepPartial<PopupMenuItem>`} */
    constructor(source?: DeepPartial<PopupMenuItem>);
}
/**
Configuration of the button located on a bar.
*/
export declare class BarButtonConfiguration extends PartiallyConstructible {
    /**
      Determines whether the button is visible or not.
      @defaultValue true;
      */
    visible: boolean;
    /**
      The text to be displayed on the button.
      @defaultValue new StyledText({});
      */
    title: StyledText;
    /**
      The text to be read when the button is selected through accessibility mode.
      @defaultValue "";
      */
    accessibilityDescription: string;
    /**
      Configuration of the background appearance for the button.
      @defaultValue new BackgroundStyle({});
      */
    background: BackgroundStyle;
    /**
      Configuration of the icon appearance.
      @defaultValue new IconStyle({});
      */
    icon: IconStyle;
    /** @param source {@displayType `DeepPartial<BarButtonConfiguration>`} */
    constructor(source?: DeepPartial<BarButtonConfiguration>);
}
/**
Determines the successful detection sound.

- `MODERN_BEEP`:
   A modern beep sound.
- `CLASSIC_BEEP`:
   The old, classic beep sound.
*/
export type SoundType = "MODERN_BEEP" | "CLASSIC_BEEP";
export declare const SoundTypeValues: SoundType[];
/**
Configuration for the sound.
*/
export declare class Sound extends PartiallyConstructible {
    /**
      Determine whether the beep sound should be enabled or not when a barcode is detected.
      @defaultValue true;
      */
    successBeepEnabled: boolean;
    /**
      Determines the successful detection sound.
      @defaultValue "MODERN_BEEP";
      */
    soundType: SoundType;
    /** @param source {@displayType `DeepPartial<Sound>`} */
    constructor(source?: DeepPartial<Sound>);
}
/**
Configure the vibration.
*/
export declare class Vibration extends PartiallyConstructible {
    /**
      Determine whether vibration should be enabled or not when a barcode is detected.
      @defaultValue false;
      */
    enabled: boolean;
    /** @param source {@displayType `DeepPartial<Vibration>`} */
    constructor(source?: DeepPartial<Vibration>);
}
/**
Configuration of timeouts.
*/
export declare class Timeouts extends PartiallyConstructible {
    /**
      Sets the length of time, in milliseconds, when the scanner should auto close. Default is 0 (disabled).
      @defaultValue 0;
      */
    autoCancelTimeout: number;
    /**
      Sets the length of time, in milliseconds, that the first scan will be delayed by. Default is 0 (disabled).
      @defaultValue 0;
      */
    initialScanDelay: number;
    /** @param source {@displayType `DeepPartial<Timeouts>`} */
    constructor(source?: DeepPartial<Timeouts>);
}
/**
Represents the insets of a rectangle.
*/
export declare class EdgeInsets extends PartiallyConstructible {
    /**
      The top inset.
      @defaultValue 0.0;
      */
    top: number;
    /**
      The left inset.
      @defaultValue 0.0;
      */
    left: number;
    /**
      The bottom inset.
      @defaultValue 0.0;
      */
    bottom: number;
    /**
      The right inset.
      @defaultValue 0.0;
      */
    right: number;
    /** @param source {@displayType `DeepPartial<EdgeInsets>`} */
    constructor(source?: DeepPartial<EdgeInsets>);
}
