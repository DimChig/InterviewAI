

import Nav from "./Nav";

export default function HomePage() {
  return (
    <>
      <div>
        <Nav/>
      </div>

      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-3xl">Welcome</h1>
      </div>
    </>
  );
}

