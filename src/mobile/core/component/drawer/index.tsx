import { CloseIconOutline } from '../../foundation/icon/outline/close';
import { token } from '../../foundation/token';
import { classname } from '../../shared/util';
import { OverlayComponent } from '../overlay';
import { IDrawerComponentProps } from './type';

import {
    StyledDrawerComponentCloseButton,
    StyledDrawerComponentContainer,
    StyledDrawerComponentContent,
} from './styled';

export const DrawerComponent = ({
    width,
    popup,
    open,
    children,
    className,
    onClose,
    ...rest
}: IDrawerComponentProps): JSX.Element => {
    return (
        <StyledDrawerComponentContainer $open={open} $popup={popup}>
            <OverlayComponent fadeIn={!popup} onClick={onClose} />
            <StyledDrawerComponentContent
                {...rest}
                $width={width}
                className={classname(token.get<string>('global.util.root.class'), className)}
            >
                <StyledDrawerComponentCloseButton onClick={onClose}>
                    <CloseIconOutline width={18} height={18} />
                </StyledDrawerComponentCloseButton>
                {children}
            </StyledDrawerComponentContent>
        </StyledDrawerComponentContainer>
    );
};
