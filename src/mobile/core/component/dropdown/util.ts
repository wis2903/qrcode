/* eslint-disable @typescript-eslint/no-explicit-any */

export class DropdownComponentUtil {
    static requestCloseForOpeningComps = new Map<any, VoidFunction>();

    public static closeAllOpeningComps(): void {
        DropdownComponentUtil.requestCloseForOpeningComps.forEach((callback) => callback());
        DropdownComponentUtil.requestCloseForOpeningComps.clear();
    }
}
