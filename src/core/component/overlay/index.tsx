import { classname } from '../../shared/util';
import { StyledOverlayComponentContainer } from './styled';
import { IOverlayComponentProps } from './type';

const OverlayComponent = (props: IOverlayComponentProps): JSX.Element => {
    const { className, backgroundColor, opacity, zIndex, fadeIn, ...rest } = props;
    return (
        <StyledOverlayComponentContainer
            {...rest}
            className={classname(className, fadeIn && 'fade-in')}
            $backgroundColor={backgroundColor}
            $opacity={opacity}
            $zIndex={zIndex}
        />
    );
};

OverlayComponent.displayName = 'OverlayComponent';

export { OverlayComponent };
