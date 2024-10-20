export const ErrorPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full text-white space-y-6">
      <h1 className="font-bold ">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
        <i>Page Not found</i>
      </p>
    </div>
  );
};
