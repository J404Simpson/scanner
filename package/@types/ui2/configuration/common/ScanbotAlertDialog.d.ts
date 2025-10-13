import { ButtonConfiguration } from "../common/Common";
import { DeepPartial, PartiallyConstructible } from "../utils";
import { StyledText } from "../common/Common";
/**
Configuration of the standard alert dialog.
*/
export declare class ScanbotAlertDialog extends PartiallyConstructible {
    /**
      The title displayed above the message.
      @defaultValue new StyledText({
          "text": "Title",
          "color": "?sbColorOnSurface"
      });
      */
    title: StyledText;
    /**
      The explanation message.
      @defaultValue new StyledText({
          "text": "Standard explanation message text.",
          "color": "?sbColorOnSurfaceVariant"
      });
      */
    subtitle: StyledText;
    /**
      The background color of the alert dialog.
      @defaultValue "?sbColorSurface";
      */
    sheetColor: string;
    /**
      The dialog overlay color.
      @defaultValue "?sbColorModalOverlay";
      */
    modalOverlayColor: string;
    /**
      The color of the divider line.
      @defaultValue "?sbColorOutline";
      */
    dividerColor: string;
    /**
      Configuration of the 'OK' button.
      @defaultValue new ButtonConfiguration({
          "background": new BackgroundStyle({
              "fillColor": "?sbColorPrimary"
          })
      });
      */
    okButton: ButtonConfiguration;
    /**
      Configuration of the middle button for dialogs with tree buttons.
      @defaultValue new ButtonConfiguration({
          "visible": false,
          "background": new BackgroundStyle({
              "strokeColor": "#00000000",
              "fillColor": "#00000000",
              "strokeWidth": 0.0
          })
      });
      */
    actionButton: ButtonConfiguration;
    /**
      Configuration of the 'cancel' button.
      @defaultValue new ButtonConfiguration({
          "visible": true,
          "background": new BackgroundStyle({
              "strokeColor": "#00000000",
              "fillColor": "#00000000",
              "strokeWidth": 0.0
          })
      });
      */
    cancelButton: ButtonConfiguration;
    /** @param source {@displayType `DeepPartial<ScanbotAlertDialog>`} */
    constructor(source?: DeepPartial<ScanbotAlertDialog>);
}
