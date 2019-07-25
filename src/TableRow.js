import React from "react";
import styled from "styled-components";

function TableRow() {
  return (
    <tr>
      <td
        className="description_table_row"
        name="description_table_row"
        style={{ width: "100%" }}
      >
        <TableDateData style={{ width: "100%", height: "100%" }} />
      </td>
      <td className="description_table_row">
        <TableDateData type="number" name="quantity" />
      </td>
      <td className="description_table_row">
        <TableDateData type="number" name="price" />
      </td>
    </tr>
  );
}

export default TableRow;

const TableDateData = styled.input`
  border: none;
  padding: 6px 0;
`;
