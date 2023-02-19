const Container = ({ children, className }) => {
  return (
    <div
      className={`w-10/12 lg:w-9/12 max-w-screen-2xl flex items-center justify-center flex-col bg-cover bg-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
