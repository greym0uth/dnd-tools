import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>FaDnDS Tools</title>
      </Head>
      <div class="grid place-content-center p-4 w-screen h-screen">
        <Counter />
      </div>
    </>
  );
}
