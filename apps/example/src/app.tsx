import { Show } from "solid-js";
import "./app.css";
import { useForm } from "@rf/solid-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Invalid Password"),
});

export default function App() {
    const { fields, errors, onInput, submitForm } = useForm<
        z.infer<typeof schema>
    >({
        schema: schema,
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            window.alert(values.email)
        },
    });

    return (
        <main class="bg-neutral-900 min-h-screen w-full flex items-center justify-center">
            <form class="flex flex-col items-stretch justify-start gap-4" method="post" onSubmit={submitForm}>
                <input
                    type="text"
                    name="email"
                    onInput={onInput}
                    placeholder="Email"
                    value={fields.email}
                    class="rounded bg-transparent border border-white/10 px-2 py-[10px] min-w-[300px] text-white"
                />
                <Show when={errors.email}>
                    <span class="text-sm text-rose-400">{errors.email}</span>
                </Show>
                <input
                    type="password"
                    name="password"
                    onInput={onInput}
                    placeholder="Password"
                    value={fields.password}
                    class="rounded bg-transparent border border-white/10 px-2 py-[10px] min-w-[300px] text-white"
                />
                <Show when={errors.password}>
                    <span class="text-sm text-rose-400">{errors.password}</span>
                </Show>
                <button
                    type="submit"
                    class="rounded bg-purple-500 text-black py-2 px-4"
                >
                    Submit Form
                </button>
            </form>
        </main>
    );
}
