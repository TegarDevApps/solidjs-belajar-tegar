import { createSignal } from "solid-js";

const [user, setUser] = createSignal<{ username: string } | null>(null);

export { user, setUser };
