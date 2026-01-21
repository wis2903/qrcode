import styled from 'styled-components';

import { token } from '../../foundation/token';
import { FlexboxComponent } from '../flexbox';

export const StyledChipComponentContainer = styled(FlexboxComponent)<{
    $backgroundColor?: string;
    $borderColor?: string;
    $textColor?: string;
}>`
    display: inline-flex;
    border-width: 0 0 0 4px;
    border-style: solid;
    white-space: nowrap;
    width: max-content;
    border-radius: ${token.get<string>('global.radius.s')};
    font-weight: ${token.get<string>('global.typo.font-weight-medium')};
    font-size: ${token.get<string>('global.typo.font-size-7')};
    padding: ${token.get<string>('global.space.xxxxs')} ${token.get<string>('global.space.xxs')};
    color: ${(props): string => props.$textColor || token.get<string>('global.color.grey-1')};
    border-color: ${(props): string => props.$borderColor || 'rgba(92, 92, 92, 0.90)'};
    background-color: ${(props): string => props.$backgroundColor || 'rgba(0, 0, 0, 0.10)'};
`;
