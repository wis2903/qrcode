import styled from 'styled-components';
import { AlignEnum } from '../../shared/type';
import { TextboxComponent } from '../textbox';

export const StyledCustomTextboxComponent = styled(TextboxComponent)<{ $align?: AlignEnum }>`
    ${(props): string => {
        switch (props.$align) {
            case AlignEnum.left:
                return 'text-align: left;';
            case AlignEnum.center:
                return 'text-align: center;';
            default:
                return 'text-align: right;';
        }
    }}
`;
