declare module '@/ziggy' {
    export const Ziggy: {
        url: string;
        port: number | null;
        defaults: Record<string, string | number>;
        routes: Record<string, unknown>;
    };
}
