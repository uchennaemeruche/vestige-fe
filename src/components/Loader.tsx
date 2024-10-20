export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>{" "}
      {/* You can style this with CSS */}
      {/* <p className="text-green-600">Loading...</p> */}
    </div>
  );
};
