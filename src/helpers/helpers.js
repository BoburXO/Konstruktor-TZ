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
