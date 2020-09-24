export interface ViewProps {
  title?: string;
  subtitle?: string;
  content:
    | React.FunctionComponent<ContentComponentProps>
    | React.ComponentClass<ContentComponentProps>;
  preventClose?: boolean;
  displayHeader?: boolean;
  width?: DimensionProps;
  height?: DimensionProps;
}

export interface ContentComponentProps {
  pushState: (view: ViewProps) => void;
  back: () => void;
  confirmationOnClose: (confirmation: boolean) => void;
}

export interface DimensionProps {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}
