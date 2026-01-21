import styled from 'styled-components';
import { token } from '../../foundation/token';

export const StyledEditorContainer = styled.div<{
    $loaded?: boolean;
    $disabled?: boolean;
    $borderWidth?: string;
    $width?: string;
    $height?: string;
}>`
    width: ${(props): string => props.$width || '100%'};
    height: ${(props): string => props.$height || 'auto'};
    display: ${(props): string => (props.$loaded ? 'block' : 'none')};
    border: ${(props): string => props.$borderWidth || '1px'} solid
        ${token.get<string>('global.color.grey-4')};
    border-radius: ${token.get<string>('global.radius.none')};
    background: ${(props): string =>
        props.$disabled ? token.get<string>('global.color.grey-8') : 'white'};

    &:hover {
        background: ${(props): string =>
            props.$disabled
                ? token.get<string>('global.color.grey-8')
                : token.get<string>('global.color.grey-9')};
    }

    .tox-editor-header {
        background-color: white;
    }

    .tox .tox-edit-area::before {
        border: 0;
    }
`;
