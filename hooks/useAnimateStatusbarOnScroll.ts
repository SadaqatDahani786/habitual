import { useDispatch, useSelector } from "react-redux";

//Redux
import { RootState } from "../store/store";
import { setStatusbarStatus } from "../store/statusbarReducer";

/**
 ** ============================================================================
 ** Hook [useAnimateStatusbarOnScroll]
 ** ============================================================================
 */
const useAnimateStatusbarOnScroll = (
  offset: number = 300
): [boolean, (yOffset: number) => void] => {
  //1) Access redux state and action dispatcher
  const statusbarBgColorStatus = useSelector(
    (state: RootState) => state.statusbar
  );
  const dispatchAction = useDispatch();

  //2) Check offset and set statusbar status based on it
  const setStatusbarBgColorStatus = (yOffset: number) => {
    if (yOffset > offset) dispatchAction(setStatusbarStatus(false));
    else if (yOffset < offset) dispatchAction(setStatusbarStatus(true));
  };

  //3) Return
  return [statusbarBgColorStatus, setStatusbarBgColorStatus];
};

export default useAnimateStatusbarOnScroll;
