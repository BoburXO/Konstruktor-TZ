export default function DrawTableWithValues({
  defaultTable = false,
  tableData,
  setTableData,
  fill = true,
  userRole,
}) {
  const beingRenderedTableData = defaultTable
    ? tableData.filter((_, rawIndex) => rawIndex === 0)
    : tableData;

  return (
    <table style={{ width: "100%" }}>
      <tbody>
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
                      }
                }
              >
                {fill ? (
                  <input
                    type="text"
                    value={cell}
                    style={{ borderRadius: "0", border: "1px solid #E6E6E6" }}
                    disabled={userRole === "author" && rawIndex === 0}
                    onChange={(e) => {
                      setTableData((prev) => {
                        const updatedData = [...prev];
                        const newData = updatedData.map((item) => [...item]);
                        newData[rawIndex][cellIndex] = e.target.value;
                        return newData;
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
      </tbody>
    </table>
  );
}
