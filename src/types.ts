export interface ViewProps {
  title?: string;
  subtitle?: string;
  content:
    | React.FunctionComponent<ContentComponentProps>
    | React.ComponentClass<ContentComponentProps>;
}

export interface ContentComponentProps {
  pushState: (view: ViewProps) => void;
}
