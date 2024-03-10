import { T, useTranslate } from "@tolgee/react";
import { Navbar } from "../components/Navbar";

export default function MainPage() {
  const t = useTranslate();
  return (
    <div>
      <div className="mt-4">
        <h1>
          <T keyName={"title"} />
        </h1>
        <p>
          <T keyName={"author"} />
        </p>
      </div>
      <Navbar />
    </div>
  );
}
