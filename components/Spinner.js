import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <Loader
      type="Oval"
      color="#00BFFF"
      height={150}
      width={150}
      //   timeout={3000}
    />
  );
};

export default Spinner;
