export interface IEditorComponentAPI {
    updateContent: (content: string) => void;
}

export interface IEditorComponentProps {
    value?: string;
    height?: string;
    width?: string;
    borderWidth?: string;
    disabled?: boolean;
    onBlur?: VoidFunction;
    onLoaded?: (api: IEditorComponentAPI) => void;
    onEditorChange?: (_: unknown, editor: unknown) => void;
    onChange?: (value: string) => void;
}
