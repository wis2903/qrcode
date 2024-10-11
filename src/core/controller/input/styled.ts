import styled from 'styled-components';
import { token } from '../../foundation/token';

export const StyledValidationMessage = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: ${token.get<string>('global.space.xxxs')};
    font-size: 12px;
    font-weight: ${token.get<string>('global.typo.font-weight-medium')};
    color: ${token.get<string>('global.color.red-4')};
`;
