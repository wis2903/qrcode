import { FlexboxComponent } from '../../../core/component/flexbox';
import { SpinnerIconOutline } from '../../../core/foundation/icon/outline/spinner';
import { FlexboxVariant } from '../../../core/shared/constant';

export const FullScreenLoader = (): JSX.Element => (
    <FlexboxComponent
        width="100%"
        height="100svh"
        align={FlexboxVariant.alignment.center}
        justify={FlexboxVariant.alignment.center}
    >
        <SpinnerIconOutline width={18} height={18} />
    </FlexboxComponent>
);
