import { AspectRatio } from "../Geometry";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { EdgeInsets } from "../common/Common";
/**
Base configuration of the scanning interface’s viewfinder, serving as guidance to the user.
*/
export type BaseViewFinderConfiguration = ViewFinderConfiguration | PermanentViewFinderConfiguration;
/** @internal */
export declare namespace BaseViewFinderConfiguration {
    /** @internal */
    function From(source: {
        [key: string]: any;
    }): BaseViewFinderConfiguration;
}
/**
Configuration of the scanning interface’s viewfinder, allowing it to be shown or hidden as guidance to the user.
*/
export declare class ViewFinderConfiguration extends PartiallyConstructible {
    readonly _type: "ViewFinderConfiguration";
    /**
      The visual appearance of the viewfinder.
      @defaultValue new FinderCorneredStyle({
          "strokeColor": "?sbColorSurface",
          "strokeWidth": 2.0,
          "cornerRadius": 10.0
      });
      */
    style: FinderStyle;
    /**
      The color of the viewfinder overlay.
      @defaultValue "?sbColorSurfaceLow";
      */
    overlayColor: string;
    /**
      The viewfinder's aspect ratio.
      @defaultValue new AspectRatio({
          "width": 1.0,
          "height": 1.0
      });
      */
    aspectRatio: AspectRatio;
    /**
      The minimum insets of the viewfinder.
      @defaultValue new EdgeInsets({
          "top": 16.0,
          "left": 16.0,
          "bottom": 16.0,
          "right": 16.0
      });
      */
    minimumInsets: EdgeInsets;
    /**
      The preferred height of the viewfinder.
      @defaultValue -1.0;
      */
    preferredHeight: number;
    /**
      Whether the viewfinder is visible.
      @defaultValue true;
      */
    visible: boolean;
    /** @param source {@displayType `DeepPartial<ViewFinderConfiguration>`} */
    constructor(source?: DeepPartial<ViewFinderConfiguration>);
}
/**
Configuration of the scanning interface’s viewfinder, which is always visible to guide the user.
*/
export declare class PermanentViewFinderConfiguration extends PartiallyConstructible {
    readonly _type: "PermanentViewFinderConfiguration";
    /**
      The visual appearance of the viewfinder.
      @defaultValue new FinderCorneredStyle({
          "strokeColor": "?sbColorSurface",
          "strokeWidth": 2.0,
          "cornerRadius": 10.0
      });
      */
    style: FinderStyle;
    /**
      The color of the viewfinder overlay.
      @defaultValue "?sbColorSurfaceLow";
      */
    overlayColor: string;
    /**
      The viewfinder's aspect ratio.
      @defaultValue new AspectRatio({
          "width": 1.0,
          "height": 1.0
      });
      */
    aspectRatio: AspectRatio;
    /**
      The minimum insets of the viewfinder.
      @defaultValue new EdgeInsets({
          "top": 16.0,
          "left": 16.0,
          "bottom": 16.0,
          "right": 16.0
      });
      */
    minimumInsets: EdgeInsets;
    /**
      The preferred height of the viewfinder.
      @defaultValue -1.0;
      */
    preferredHeight: number;
    /** @param source {@displayType `DeepPartial<PermanentViewFinderConfiguration>`} */
    constructor(source?: DeepPartial<PermanentViewFinderConfiguration>);
}
/**
The visual appearance of the viewfinder.
*/
export type FinderStyle = FinderCorneredStyle | FinderStrokedStyle;
/** @internal */
export declare namespace FinderStyle {
    /** @internal */
    function From(source: {
        [key: string]: any;
    }): FinderStyle;
}
/**
A variant of the viewfinder displaying only the four corners of the scanning area.
*/
export declare class FinderCorneredStyle extends PartiallyConstructible {
    readonly _type: "FinderCorneredStyle";
    /**
      The color of the viewfinder corner's outlines.
      @defaultValue "#FFFFFFFF";
      */
    strokeColor: string;
    /**
      The width of the viewfinder corner's outlines.
      @defaultValue 3.0;
      */
    strokeWidth: number;
    /**
      The radius of the viewfinder's corners.
      @defaultValue 10.0;
      */
    cornerRadius: number;
    /** @param source {@displayType `DeepPartial<FinderCorneredStyle>`} */
    constructor(source?: DeepPartial<FinderCorneredStyle>);
}
/**
A variant of the viewfinder displaying a full outline of the scanning area.
*/
export declare class FinderStrokedStyle extends PartiallyConstructible {
    readonly _type: "FinderStrokedStyle";
    /**
      The color of the viewfinder corner's outlines.
      @defaultValue "#FFFFFFFF";
      */
    strokeColor: string;
    /**
      The width of the viewfinder corner's outlines.
      @defaultValue 3.0;
      */
    strokeWidth: number;
    /**
      The radius of the viewfinder's corners.
      @defaultValue 10.0;
      */
    cornerRadius: number;
    /** @param source {@displayType `DeepPartial<FinderStrokedStyle>`} */
    constructor(source?: DeepPartial<FinderStrokedStyle>);
}
