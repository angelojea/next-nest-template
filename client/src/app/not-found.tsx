import Link from "next/link";

const Error = () => {
  return (
    <>
      <div>
        <div>
          <h1>404 ! Page Not Found </h1>
          <Link href={"/"}>Go to home</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
