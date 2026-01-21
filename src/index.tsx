import './shared/style/general.css';

import ReactDOM from 'react-dom/client';
import DesktopApp from './desktop';
import MobileApp from './mobile';

import { isMobile } from './shared/util';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(isMobile() ? <MobileApp /> : <DesktopApp />);
