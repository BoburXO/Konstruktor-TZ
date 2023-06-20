import { Fragment } from "react";
import SectionsWithChildren from "../Structure/SectionsWithChildren/SectionsWithChildren";
import SectionsWithChildrenForAuthor from "../SectionsWithChildrenForAuthor/SectionsWithChildrenForAuthor";

export default function RenderSectionsWithChildren({ sections, userRole }) {
  const renderSectionsWithChildren = (sections, userRole) => {
    return sections?.map((item) => (
      <Fragment key={item?.id}>
        {userRole === "author" ? (
          <SectionsWithChildrenForAuthor item={item} />
        ) : (
          <SectionsWithChildren item={item} />
        )}
        {item?.children?.length > 0
          ? renderSectionsWithChildren(item?.children, userRole)
          : null}
      </Fragment>
    ));
  };

  return renderSectionsWithChildren(sections, userRole);
}
