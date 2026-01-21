import styled from 'styled-components';

import { RightPanelScanner } from './scanner';
import { RightPanelSelection } from './selection';

const StyledRightPanelContainer = styled.div`
	height: 100%;
	width: 272px;
	min-width: 272px;
	padding: 20px;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 2px solid #ffffff;
	background-color: #f2f2f2;
	gap: 20px;
	position: relative;
	z-index: 4;
`;

export const RightPanel = (): JSX.Element => {
	return (
		<StyledRightPanelContainer>
			<RightPanelSelection />
			<RightPanelScanner />
		</StyledRightPanelContainer>
	);
};
