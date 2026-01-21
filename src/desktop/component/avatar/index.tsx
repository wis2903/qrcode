import styled from 'styled-components';

import { upperCaseFirtLetter } from '../../core/shared/util';

const StyledAvatarComponent = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    padding: 2px 0 0;
`;

export const AvatarComponent = ({ username }: { username: string }): JSX.Element => {
    return (
        <StyledAvatarComponent>
            {upperCaseFirtLetter(username.substring(0, 1))}
        </StyledAvatarComponent>
    );
};
