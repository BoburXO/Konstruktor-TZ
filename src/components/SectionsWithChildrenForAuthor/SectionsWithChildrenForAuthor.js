import SectionsField from "../CreateTZ1-component/SectionsField";
export default function SectionsWithChildrenForAuthor({ item }) {
  return (
    <>
      <h3>{`${item?.header_name}. ${item?.name}`}</h3>
      {item?.f_section?.map((field) => (
        <SectionsField key={field?.id} field={field} />
      ))}
      <br />
    </>
  );
}
