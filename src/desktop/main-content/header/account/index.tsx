import styled from 'styled-components';

import { useAuthProvider } from '../../../../shared/provider/auth';
import { AvatarComponent } from '../../../component/avatar';
import { ButtonComponent } from '../../../core/component/button';
import { AngleIconOutline } from '../../../core/foundation/icon/outline/angle';
import { Direction } from '../../../core/shared/constant';

import {
    DropdownComponent,
    DropdownComponentContent,
    DropdownComponentItem,
    DropdownComponentMenu,
    DropdownComponentTrigger,
} from '../../../core/component/dropdown';

const StyledMainContentHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    span {
        width: max-content;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 200px;
        padding: 2px 0 0;
    }
`;

export const MainContentHeaderAccount = (): JSX.Element => {
    const authCtx = useAuthProvider();

    return (
        <StyledMainContentHeaderAccount>
            <AvatarComponent username={String(authCtx.profile?.email || '')} />
            <span>{String(authCtx.profile?.email || '')}</span>

            <DropdownComponent
                closeOnClickInside
                verticleDirection={Direction.verticle.bottom}
                horizontalDirection={Direction.horizontal.right}
            >
                <DropdownComponentTrigger>
                    <ButtonComponent circle borderColor="transparent">
                        <AngleIconOutline width={14} height={14} />
                    </ButtonComponent>
                </DropdownComponentTrigger>

                <DropdownComponentContent>
                    <DropdownComponentMenu>
                        <DropdownComponentItem onClick={(): void => authCtx.signOut()}>
                            Sign out
                        </DropdownComponentItem>
                    </DropdownComponentMenu>
                </DropdownComponentContent>
            </DropdownComponent>
        </StyledMainContentHeaderAccount>
    );
};
