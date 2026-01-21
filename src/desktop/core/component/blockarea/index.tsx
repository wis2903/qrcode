import { IconCollection } from '../../foundation/icon';
import { StyledBlockAreaComponent } from './styled';
import { IBlockAreaComponentProps } from './type';

const SpinnerIcon = IconCollection.outline.spinner;

const BlockAreaComponent = ({
    width,
    minWidth,
    height,
    maxHeight,
    blocked,
    spinnerMargin,
    hasLoader,
    children,
    ...rest
}: IBlockAreaComponentProps): JSX.Element => {
    return (
        <StyledBlockAreaComponent
            {...rest}
            $blocked={blocked}
            $width={width}
            $minWidth={minWidth}
            $height={height}
            $maxHeight={maxHeight}
            $spinnerMargin={spinnerMargin}
        >
            <div>{children}</div>
            {hasLoader && blocked && (
                <span>
                    <SpinnerIcon width={18} height={18} />
                </span>
            )}
        </StyledBlockAreaComponent>
    );
};

BlockAreaComponent.displayName = 'BlockAreaComponent';

export { BlockAreaComponent };
