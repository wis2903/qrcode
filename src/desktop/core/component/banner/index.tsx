import { InfoIconFilled } from '../../foundation/icon/filled/info';
import { WarningIconFilled } from '../../foundation/icon/filled/warning';
import { token } from '../../foundation/token';
import { FlexboxComponent } from '../flexbox';
import { PlainTextComponent } from '../plain';

interface IBannerComponentProps {
    message: string;
    padding?: string;
    width?: string;
    type?: 'info' | 'danger' | 'warning' | 'default';
    size?: 'default' | 'small';
    action?: {
        label: string;
        onClick?: VoidFunction;
    };
}

const BannerComponent = ({
    message,
    padding,
    width,
    type = 'info',
    size = 'default',
    action,
}: IBannerComponentProps): JSX.Element => {
    const [backgroundColor, color, icon] = ((): [string, string, React.ReactNode] => {
        switch (type) {
            case 'danger':
                return [
                    token.get<string>('global.color.red-5'),
                    token.get<string>('global.color.red-2'),
                    <WarningIconFilled
                        width={14}
                        height={14}
                        key="icon"
                        color={token.get<string>('global.color.red-2')}
                    />,
                ];
            case 'warning':
                return [
                    token.get<string>('global.color.orange-6'),
                    token.get<string>('global.color.orange-2'),
                    <WarningIconFilled
                        width={14}
                        height={14}
                        key="icon"
                        color={token.get<string>('global.color.orange-2')}
                    />,
                ];
            case 'default':
                return ['transparent', token.get<string>('global.color.grey-1'), undefined];
            default:
                return [
                    token.get<string>('global.color.blue-5'),
                    token.get<string>('global.color.blue-2'),
                    <InfoIconFilled
                        width={14}
                        height={14}
                        key="icon"
                        color={token.get<string>('global.color.blue-2')}
                    />,
                ];
        }
    })();

    return (
        <FlexboxComponent
            wrap
            width={width || '100%'}
            padding={type === 'default' ? '0' : padding || '10px 16px'}
            borderRadius="4px"
            gap="3px"
            backgroundColor={backgroundColor}
        >
            {!!icon && (
                <FlexboxComponent margin={`${size === 'small' ? '0' : '1px'} 3px 0 0`}>
                    {icon}
                </FlexboxComponent>
            )}
            <FlexboxComponent wrap width="calc(100% - 20px)" gap="3px">
                {message.split(' ').map((word, idx) => (
                    <PlainTextComponent
                        ellipsis
                        whiteSpace="nowrap"
                        maxWidth="100%"
                        key={idx}
                        color={color}
                        fontSize={size === 'small' ? '13px' : '14px'}
                        lineHeight={size === 'small' ? '18px' : undefined}
                        text={word.replace('<b>', '').replace('</b>', '')}
                        fontWeight={word.includes('<b>') ? 'bold' : 'normal'}
                    />
                ))}
                {!!action && (
                    <PlainTextComponent
                        fontWeight="normal"
                        margin="0 0 0 4px"
                        decoration="underline"
                        color={color}
                        text={action.label}
                        onClick={action.onClick}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </FlexboxComponent>
        </FlexboxComponent>
    );
};

BannerComponent.displayName = 'BannerComponent';
export { BannerComponent };

