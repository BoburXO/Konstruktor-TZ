import { useEffect } from "react";

export default function DrawTableWithValues({
  tableData,
  defaultTable = false,
  setTableData,
  fill = true,
}) {
  const beingRenderedTableData = defaultTable
    ? tableData.filter((_, rawIndex) => rawIndex === 0)
    : tableData;

  return (
    <table style={{ width: "100%" }}>
      {beingRenderedTableData?.map((raw, rawIndex) => (
        <tr key={rawIndex}>
          {raw?.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              style={
                defaultTable
                  ? null
                  : {
                      border: "1px solid #E6E6E6",
                      height: "30px",
                      padding: "0 5px",
                    }
              }
            >
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
                cell || null
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
