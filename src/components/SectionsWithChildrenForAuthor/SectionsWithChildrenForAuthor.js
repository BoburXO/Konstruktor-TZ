import { fetchTemplates } from "../../redux/api/user/structure_slice";
import SectionsField from "../CreateTZ1-component/SectionsField";
import { useSelector, useDispatch } from "react-redux";
export default function SectionsWithChildrenForAuthor({ item }) {
  const dispatch = useDispatch();

  const handleFetchTemplates = () => {
    dispatch(fetchTemplates(item?.id));
  };

  return (
    <div onClick={handleFetchTemplates}>
      <h3>{`${item?.header_name}. ${item?.name}`}</h3>
      {item?.f_section?.map((field) => (
        <SectionsField key={field?.id} field={field} />
      ))}
      <br />
    </div>
  );
}
