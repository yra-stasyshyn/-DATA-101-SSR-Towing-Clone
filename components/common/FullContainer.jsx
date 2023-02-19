const FullContainer = ({ children, className }) => {
  return (
    <div
      className={`w-full flex items-center mr-auto ml-auto justify-center flex-col bg-cover bg-center ${className}`}
    >
      {children}
    </div>
  );
};

export default FullContainer;
