import { Fragment } from "react";
import SectionsWithChildren from "../components/Structure/SectionsWithChildren/SectionsWithChildren";

export const setDefaultTableWithoutValue = (
  tableRaws,
  tableCols,
  setDefaultTableFalue = Function.prototype
) => {
  if (tableCols > 0 && tableRaws > 0) {
    setDefaultTableFalue([]);
    setDefaultTableFalue((prev) => {
      const updatedData = [...prev];
      for (let i = 0; i < tableRaws; i++) {
        updatedData.push([]);
      }
      for (let item of updatedData) {
        for (let j = 0; j < tableCols; j++) {
          item.push("");
        }
      }
      return updatedData;
    });
  }
};

export const drawTableWithValues = (
  tableData,
  setTableData = Function.prototype,
  fill = true
) => {
  return (
    <table style={{ width: "100%" }}>
      {tableData?.map((raw, rawIndex) => (
        <tr key={rawIndex}>
          {raw?.map((cell, cellIndex) => (
            <td key={cellIndex}>
              {fill ? (
                <input
                  type="text"
                  value={cell}
                  style={{ borderRadius: "0" }}
                  onChange={(e) => {
                    setTableData((prev) => {
                      const updatedData = [...prev];
                      updatedData[rawIndex][cellIndex] = e.target.value;
                      return updatedData;
                    });
                  }}
                />
              ) : (
                { cell }
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export const renderSectionsWithChildren = (sections) => {
  return sections?.map((item) => {
    return (
      <Fragment key={item?.id}>
        <SectionsWithChildren item={item} />
        {item?.children?.length > 0
          ? renderSectionsWithChildren(item.children)
          : null}
      </Fragment>
    );
  });
};

export const setRowNumberForTz = (page, countPerPage = 8, index) => {
  const rowNumber = (page - 1) * +countPerPage + index + 1;
  return rowNumber;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateEmailWhenSubmitted = (email, ref) => {
  const isCorrect = validateEmail(email);
  if (!isCorrect) {
    return ref.current.focus();
  }
};
