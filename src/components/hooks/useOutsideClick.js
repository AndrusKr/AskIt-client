import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setIsDisplayOptionsOpened} from "../../actions/slide";


export const useOutsideClick = (ref) => {
  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setIsDisplayOptionsOpened(false))
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, ref]);

  return ref;
}
