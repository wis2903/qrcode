import { StyledScrollAreaComponentContainer } from './styled';
import { IScrollAreaComponentProps } from './type';

const ScrollAreaComponent = (props: IScrollAreaComponentProps): JSX.Element => {
    const { alwaysDisplayScrollbarPlaceholder, width = '100%', ...rest } = props;

    return (
        <StyledScrollAreaComponentContainer
            {...rest}
            width={width}
            $alwaysDisplayScrollbarPlaceholder={alwaysDisplayScrollbarPlaceholder}
        />
    );
};

ScrollAreaComponent.displayName = 'ScrollAreaComponent';

export { ScrollAreaComponent };
