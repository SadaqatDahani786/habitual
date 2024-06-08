import { useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 ** ============================================================================
 ** Hook [useFirebase]
 ** ============================================================================
 */
const useFirebase = () => {
  //1) Access state
  const { app, auth, storage, db } = useSelector(
    (state: RootState) => state.firebase
  );

  //2) Return
  return { app, auth, storage, db };
};

export default useFirebase;
