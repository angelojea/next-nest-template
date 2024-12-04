import { PropsWithChildren } from "react";

export default function Page(props: PropsWithChildren) {
  return (
    <>
      <h2>Employees Id</h2>
      {props.children}
    </>
  );
}
