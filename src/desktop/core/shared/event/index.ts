interface IPandaEventListener {
    callback: (data?: unknown) => void;
    type: string;
}

let instance: PandaEvent;

export class PandaEvent {
    listeners: IPandaEventListener[] = [];

    static get instance(): PandaEvent {
        if (!instance) instance = new PandaEvent();
        return instance;
    }

    addEventListener(listener: IPandaEventListener): void {
        this.listeners.push(listener);
    }

    removeEventListener(listener: IPandaEventListener): void {
        this.listeners = this.listeners.filter((item) => item !== listener);
    }

    triggerEventListeners(type: string, data?: unknown): void {
        this.listeners.forEach((item) => {
            if (item.type === type) item.callback(data);
        });
    }

    clearEventListeners(type: string): void {
        this.listeners = this.listeners.filter((item) => item.type !== type);
    }
}
