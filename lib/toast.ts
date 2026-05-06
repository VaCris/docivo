import { sileo } from "sileo";

type ToastOptions = {
    title: string;
    description?: string;
};

export const toast = {
    success: ({ title, description }: ToastOptions) =>
        sileo.success({ title, description }),

    error: ({ title, description }: ToastOptions) =>
        sileo.error({ title, description }),

    warning: ({ title, description }: ToastOptions) =>
        sileo.warning({ title, description }),

    info: ({ title, description }: ToastOptions) =>
        sileo.info({ title, description }),

    promise: <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((err: unknown) => string);
        }
    ) => {
        let successFn: (data: T) => string;
        let errorFn: (err: unknown) => string;

        if (typeof messages.success === "function") {
            successFn = messages.success;
        } else {
            const msg = messages.success;
            successFn = () => msg;
        }

        if (typeof messages.error === "function") {
            errorFn = messages.error;
        } else {
            const msg = messages.error;
            errorFn = () => msg;
        }

        return sileo.promise<T>(promise, {
            loading: { title: messages.loading },
            success: (data: T) => ({
                title: successFn(data),
            }),
            error: (err: unknown) => ({
                title: errorFn(err),
            }),
        });
    },

    dismiss: (id: string) => sileo.dismiss(id),
    clear: () => sileo.clear(),
};