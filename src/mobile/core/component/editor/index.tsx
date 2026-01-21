import React from 'react';

import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { SpinnerIconOutline } from '../../foundation/icon/outline/spinner';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { FlexboxAlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { StyledEditorContainer } from './editor.styled';
import { IEditorComponentProps } from './type';

// for self-hosted version
import 'tinymce/tinymce';

// models
import 'tinymce/models/dom/model';

// theme
import 'tinymce/themes/silver';

// icons
import 'tinymce/icons/default';

// plugins
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';

// skin
import 'tinymce/skins/ui/oxide/content.inline.css';
import 'tinymce/skins/ui/oxide/skin.css';

const EditorComponent = ({
    value: valueFromProps,
    borderWidth,
    width,
    height = '220px',
    disabled,
    onBlur,
    onLoaded,
    onEditorChange,
    onChange,
}: IEditorComponentProps): JSX.Element => {
    const editorInstanceRef = React.useRef<unknown>();
    const valueFromPropsRef = React.useRef<string | undefined>(valueFromProps);

    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [triggerOnChangeEventDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [setupInitialContentDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(500));

    const handleOnChange = (_: unknown, editor: unknown): void => {
        onEditorChange?.(_, editor);
        triggerOnChangeEventDebouncer.execute(() => {
            onChange?.(String(Object(editor).getContent?.() || ''));
        });
    };

    const handleUpdateContent = (value: string | undefined): void => {
        Object(editorInstanceRef.current).setContent?.(value || '');
    };

    React.useEffect(() => {
        valueFromPropsRef.current = valueFromProps;
    }, [valueFromProps]);

    React.useEffect(() => {
        onLoaded?.({ updateContent: handleUpdateContent });
        return (): void => {
            triggerOnChangeEventDebouncer.destroy();
            setupInitialContentDebouncer.destroy();
        };
    }, []);

    return (
        <>
            {!loaded && (
                <FlexboxComponent
                    align={FlexboxAlignEnum.center}
                    justify={FlexboxAlignEnum.center}
                    borderWidth={borderWidth || '1px'}
                    width="100%"
                    height={height}
                    backgroundColor={token.get<string>('global.color.grey-9')}
                    borderColor={token.get<string>('global.color.grey-4')}
                >
                    <SpinnerIconOutline width={18} height={18} />
                </FlexboxComponent>
            )}
            <StyledEditorContainer
                $borderWidth={borderWidth}
                $loaded={loaded}
                $disabled={disabled}
                $width={width}
                $height={height}
            >
                <TinyMCE
                    licenseKey="gpl"
                    init={{
                        plugins: 'anchor autolink lists',
                        toolbar:
                            'bold italic underline strikethrough | numlist bullist | indent outdent | removeformat',
                        statusbar: false,
                        menubar: false,
                        browser_spellcheck: false,
                        height,
                        paste_as_text: true,
                        skin: false,
                        content_css: ['/assets/styles/custom-tiny-editor.css'],
                        init_instance_callback: (inst): void => {
                            editorInstanceRef.current = inst;
                        },
                    }}
                    disabled={disabled}
                    onInit={(): void => {
                        setLoaded(true);
                        setupInitialContentDebouncer.execute(() => {
                            valueFromPropsRef.current && handleUpdateContent(valueFromPropsRef.current);
                        });
                    }}
                    onEditorChange={handleOnChange}
                    onBlur={onBlur}
                />
            </StyledEditorContainer>
        </>
    );
};

EditorComponent.displayName = 'EditorComponent';
export { EditorComponent };
