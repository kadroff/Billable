import React from "react";
import styled from "styled-components";

function TableRow(props) {
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
      <td>
        <DeleteRowButton
          onClick={() => props.onDelete(props.index)}
          type="button"
          value="[ - ]"
        />
      </td>
    </tr>
  );
}

export default TableRow;

const TableDateData = styled.input`
  border: none;
  padding: 6px 0;
`;

const DeleteRowButton = styled.input`
  font-size: 0.8em;
  outline: none;
  text-decoration: none;
  background: none;
  border: none;
  color: #4473ea;
  cursor: pointer;
`;
