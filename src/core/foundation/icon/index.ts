import { CheckIconFilled } from './filled/check';
import { CloseIconFilled } from './filled/close';
import { InfoIconFilled } from './filled/info';
import { WarningIconFilled } from './filled/warning';
import { AngleIconOutline } from './outline/angle';
import { CalendarIconOutline } from './outline/calendar';
import { CheckIconOutline } from './outline/check';
import { CloseIconOutline } from './outline/close';
import { DeleteIconOutline } from './outline/delete';
import { DownloadIconOutline } from './outline/download';
import { EditIconOutline } from './outline/edit';
import { FilterIconOutline } from './outline/filter';
import { InfoIconOutline } from './outline/info';
import { VerticalDotsIconOutline } from './outline/l';
import { PlusIconOutline } from './outline/plus';
import { ReloadIconOutline } from './outline/reload';
import { SearchIconOutline } from './outline/search';
import { SpinnerIconOutline } from './outline/spinner';
import { UploadIconOutline } from './outline/upload';
import { WarningIconOutline } from './outline/warning';

export const IconCollection = {
    outline: {
        angle: AngleIconOutline,
        check: CheckIconOutline,
        spinner: SpinnerIconOutline,
        close: CloseIconOutline,
        verticalDots: VerticalDotsIconOutline,
        calendar: CalendarIconOutline,
        search: SearchIconOutline,
        plus: PlusIconOutline,
        warning: WarningIconOutline,
        download: DownloadIconOutline,
        upload: UploadIconOutline,
        edit: EditIconOutline,
        delete: DeleteIconOutline,
        filter: FilterIconOutline,
        reload: ReloadIconOutline,
        info: InfoIconOutline,
    },
    filled: {
        close: CloseIconFilled,
        check: CheckIconFilled,
        warning: WarningIconFilled,
        info: InfoIconFilled,
    },
};
