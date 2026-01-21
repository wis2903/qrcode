import styled from 'styled-components';

const StyledMainContentHeaderAppName = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    font-weight: 600;
    font-size: 18px;

    span {
        display: inline-flex;
        padding: 4px 0 0;
    }

    img {
        width: 22px;
    }
`;

export const MainContentHeaderAppName = (): JSX.Element => {
    return (
        <StyledMainContentHeaderAppName>
            <img src="/logo.png" alt="" />
            <span>Panda scanning</span>
        </StyledMainContentHeaderAppName>
    );
};
