import { signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";

const count = signal(Number(window.localStorage.getItem("count") || "0"));

const decrement = (amount: number) => {
  count.value -= amount;
  window.localStorage.setItem("count", String(count.value));
};

export default function Counter() {
  const manualAmount = useSignal(0);

  const handleManual: JSXInternal.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    decrement(manualAmount.value);
    manualAmount.value = 0;
  };

  return (
    <div class="flex flex-col items-center gap-2 w-full">
      <section class="px-12 py-8 border-1 border-blue-300 bg-blue-100">
        <p class="flex-grow-1 font-bold text-6xl text-blue-600">{count}</p>
      </section>
      <section class="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((amount) => (
          <Button key={amount} onClick={() => decrement(amount)}>-{amount}</Button>
        ))}
      </section>
      <form class="flex gap-4" onSubmit={handleManual}>
        <section class="flex gap-2">
          <Button type="button" onClick={() => {
            if (manualAmount.value !== 0) {
              manualAmount.value -= 1;
            }
          }}>-</Button>
          <input
            type="number"
            name="amount"
            class="w-24 py-1"
            value={manualAmount.value}
            onInput={(event) => manualAmount.value = (event.target as HTMLInputElement).valueAsNumber}
          />
          <Button type="button" onClick={() => manualAmount.value += 1}>+</Button>
        </section>
        <Button class="ml-4" type="submit">Go</Button>
      </form>
    </div>
  );
}
