import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      darkBlueText: string;
      whitecolor: string;
      darkgrey: string;
    };

    fontSize: {
      small: string;
      default: string;
      mid: string;
      big: string;
      jumbo: string;
    };
    device: string;
  }
}
