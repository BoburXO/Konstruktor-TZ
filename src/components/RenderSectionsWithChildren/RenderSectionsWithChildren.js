import { Fragment } from "react";
import SectionsWithChildren from "../Structure/SectionsWithChildren/SectionsWithChildren";
import SectionsWithChildrenForAuthor from "../SectionsWithChildrenForAuthor/SectionsWithChildrenForAuthor";

export default function RenderSectionsWithChildren({ sections, action }) {
  const renderSectionsWithChildren = (sections, action) => {
    return sections?.map((item) => (
      <Fragment key={item?.id}>
        {action === "createTz" ? (
          <SectionsWithChildrenForAuthor item={item} />
        ) : (
          <SectionsWithChildren item={item} />
        )}
        {item?.children?.length > 0
          ? renderSectionsWithChildren(item?.children, action)
          : null}
      </Fragment>
    ));
  };


  return renderSectionsWithChildren(sections, action);
}
