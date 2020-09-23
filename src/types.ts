export interface ViewProps {
  title?: string;
  subtitle?: string;
  content:
    | React.FunctionComponent<ContentComponentProps>
    | React.ComponentClass<ContentComponentProps>;
  preventClose?: boolean;
  displayHeader?: boolean;
}

export interface ContentComponentProps {
  pushState: (view: ViewProps) => void;
  back: () => void;
  confirmationOnClose: (confirmation: boolean) => void;
}
