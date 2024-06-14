import { ZodSchema } from "zod";

import { createStore } from "solid-js/store";
import { createSignal, createMemo, JSX } from "solid-js";

type SolidFormProps<T extends Object> = {
    schema: ZodSchema<T>;
    defaultValues: T;
    onSubmit: (values: T) => Promise<void> | void;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

type FieldError<T extends Object> = Partial<Record<keyof T, string | string[]>>;

export function useForm<T extends Object>({
    schema,
    defaultValues,
    onSubmit,
    validateOnBlur = false,
    validateOnChange = false,
}: SolidFormProps<T>) {
    const [fields, setFields] = createStore<T>(defaultValues);
    const [errors, setErrors] = createStore<FieldError<T>>({});
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const defaultFields = createMemo(() =>
        Array.from(Object.keys(defaultValues)),
    );

    const onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = async (
        event,
    ) => {
        if (defaultFields().indexOf(event.currentTarget.name) < 0) return;

        setFields((prev) => ({
            ...prev,
            [event.currentTarget.name]: event.currentTarget.value,
        }));

        if (validateOnChange) {
            parseForm();
        }
    };

    const onBlur: JSX.FocusEventHandlerUnion<
        HTMLInputElement,
        FocusEvent
    > = () => {
        if (validateOnBlur) {
            parseForm();
        }
    };

    const parseForm = () => {
        const parsed = schema.safeParse(fields);

        if (parsed.error) {
            const flatErrors = parsed.error.flatten();
            const mappedErrors: FieldError<T> = {};

            for (const field of Object.keys(defaultValues)) {
                if (
                    Object.keys(flatErrors.fieldErrors).some((prev) => prev === field)
                ) {
                    mappedErrors[field as keyof typeof defaultValues] = (
                        flatErrors.fieldErrors[
                        field as keyof typeof defaultValues
                        ] as string[]
                    )[0];
                } else {
                    mappedErrors[field as keyof typeof defaultValues] = undefined;
                }
            }

            setErrors(mappedErrors);

            return false;
        }

        return true;
    };

    const submitForm = async () => {
        const parsed = parseForm();

        if (!parsed) return;
        setIsLoading(true);
        try {
            await onSubmit(fields);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };

    const setFieldError = (
        fieldName: keyof typeof defaultValues,
        error: string,
    ) => {
        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }));
    };

    const setFieldValue = (
        fieldName: keyof typeof defaultValues,
        value: string,
    ) => {
        setFields((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    return {
        onInput,
        fields,
        errors,
        isLoading,
        submitForm,
        setFieldError,
        setFieldValue,
        onBlur,
    };
}
