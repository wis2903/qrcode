import styled from 'styled-components';
import { token } from '../../foundation/token';

interface IStyledCheckboxComponentBoxProps {
    $isSwitch?: boolean;
    $checked?: boolean;
    $disabled?: boolean;
}

const boxStyle = (props: IStyledCheckboxComponentBoxProps): string => `
    cursor: pointer;
    outline: 0;
    padding: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: ${token.get<string>('component.checkbox.box.radius')};
    width: ${token.get<string>('component.checkbox.box.width')};
    height: ${token.get<string>('component.checkbox.box.height')};
    min-width: ${token.get<string>('component.checkbox.box.width')};
    min-height: ${token.get<string>('component.checkbox.box.height')};
    background-color: ${token.get<string>('component.checkbox.box.background-color.default')};
    border-color: ${token.get<string>('component.checkbox.box.border-color.default')};

    &:hover {
        border-color: ${token.get<string>('component.checkbox.box.border-color.hover')};
    }

    ${((): string => {
        if (!props.$isSwitch) return '';

        return `
            position: relative;
            width: 36px;
            height: 20px;
            border-radius: ${token.get<string>('global.radius.round')};
            background-color: ${token.get<string>('global.color.grey-4')};
            border: 0;

            &::before{
                position: absolute;
                content: '';
                width: 16px;
                height: 16px;
                left: 2px;
                top: 2px;
                border-radius: ${token.get<string>('global.radius.circle')};
                background-color: white;
                // transition: left linear 0.15s;
            }
        `;
    })()}

    ${((): string => {
        if (!props.$checked) return '';

        if (props.$isSwitch) {
            return `
                background-color: ${token.get<string>('global.color.primary')};

                &::before{
                    left: calc(100% - 2px - 16px);
                }
            `;
        }

        return `
            border-color: ${token.get<string>('component.checkbox.box.border-color.checked')};
            background-color: ${token.get<string>(
                'component.checkbox.box.background-color.checked'
            )};
        `;
    })()}

    ${((): string => {
        if (!props.$disabled) return '';

        if (props.$isSwitch) {
            return `
                opacity: 0.5;
                cursor: not-allowed;
            `;
        }

        return `
            cursor: not-allowed;
            border-color: ${token.get<string>('component.checkbox.box.border-color.default')};
            background-color: ${token.get<string>(
                'component.checkbox.box.background-color.disabled'
            )};

            &:hover {
                border-color: ${token.get<string>('component.checkbox.box.border-color.default')};
            }
        `;
    })()}
`;

export const StyledCheckboxComponentBox = styled.button<IStyledCheckboxComponentBoxProps>`
    ${(props): string => boxStyle(props)}
`;

export const StyledCheckboxComponentBoxSpan = styled.span<IStyledCheckboxComponentBoxProps>`
    ${(props): string => boxStyle(props)}
`;

export const StyledCheckboxComponentLabel = styled.span<{
    $disabled?: boolean;
    $isSwitch?: boolean;
}>`
    cursor: ${(props): string => (props.$disabled ? 'not-allowed' : 'pointer')};
    font-size: ${token.get<string>('component.checkbox.label.font-size')};
    color: ${token.get<string>('component.checkbox.label.text-color')};
    line-height: ${token.get<string>('component.checkbox.label.line-height')};
    transform: translateY(-1px);

    ${(props): string => {
        if (!props.$isSwitch) return '';

        return `
            color: ${
                props.$disabled
                    ? token.get<string>('global.color.grey-4')
                    : token.get<string>('component.checkbox.label.text-color')
            };
            margin-top: 2px;
        `;
    }}
`;

export const StyledCheckboxComponentContainer = styled.div`
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${token.get<string>('global.space.xxs')};
`;

export const StyledMinusIcon = styled.span`
    height: 1px;
    background: #e5e5e5;
    width: 8px;
`;
