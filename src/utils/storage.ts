export type Serializer<T> = {
    read(raw: string): T;

    write(value: T): string;
};

export const Serializers: Record<string, Serializer<any>> = {
    boolean: {
        read: (v: any) => v != null ? v === 'true' : null,
        write: (v: any) => String(v),
    },
    object: {
        read: (v: any) => v ? JSON.parse(v) : null,
        write: (v: any) => JSON.stringify(v),
    },
    number: {
        read: (v: any) => v != null ? Number.parseFloat(v) : null,
        write: (v: any) => String(v),
    },
    any: {
        read: (v: any) => v != null ? v : null,
        write: (v: any) => String(v),
    },
    string: {
        read: (v: any) => v != null ? v : null,
        write: (v: any) => String(v),
    },
};


export function getLocalStorage<T>(key: string, defaultValue: T) {
    const type = defaultValue == null
        ? 'any'
        : typeof defaultValue === 'boolean'
            ? 'boolean'
            : typeof defaultValue === 'string'
                ? 'string'
                : typeof defaultValue === 'object'
                    ? 'object'
                    : Array.isArray(defaultValue)
                        ? 'object'
                        : !Number.isNaN(defaultValue)
                            ? 'number'
                            : 'any';
    const serializer = Serializers[type];

    const rawValue = localStorage.getItem(key);
    if (rawValue == null) {
        localStorage.setItem(key, serializer.write(defaultValue));
        return defaultValue;
    }
    else {
        return serializer.read(rawValue) as T;
    }
}

export function setLocalStorage<T>(key: string, value: T) {
    const type = value == null
        ? 'any'
        : typeof value === 'boolean'
            ? 'boolean'
            : typeof value === 'string'
                ? 'string'
                : typeof value === 'object'
                    ? 'object'
                    : Array.isArray(value)
                        ? 'object'
                        : !Number.isNaN(value)
                            ? 'number'
                            : 'any';
    const serializer = Serializers[type];

    localStorage.setItem(key, serializer.write(value));
}