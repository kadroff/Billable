import React, { useState } from "react";
import Pdf from "react-to-pdf";
import "./App.css";
import styled from "styled-components";

function App() {
  const [values, setValues] = useState({ quantity: 1, price: 2, percent: 12 });
  const ref = React.createRef();
  const subtotal = values.quantity * values.price;
  const percent = (values.percent / 100) * subtotal;
  const total = subtotal + percent;

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  return (
    <Main>
      {/* Convert to PDF */}
      <Pdf targetRef={ref} filename="invoice.pdf">
        {({ toPdf }) => (
          <OptionButton type="button" value="Download PDF" onClick={toPdf} />
        )}
      </Pdf>

      <Pages ref={ref}>
        <Kind type="text" defaultValue="INVOICE" />
        <CompanyName defaultValue="Example Co." />
        <AddressCompany
          defaultValue="www.example.com
          info@example.com"
        />
        <InformationCompany
          defaultValue="Michael Scott Paper Company Inc.
          1725 Slough Avenue
          Scranton, Pennsylvania"
        />
        <TableDate>
          <tbody>
            <tr>
              <th>
                <TableDateHeader type="text" defaultValue="Invoice #" />
              </th>
              <td>
                <TableDateData type="text" defaultValue="1" />
              </td>
            </tr>

            <tr>
              <th>
                <TableDateHeader type="text" defaultValue="Date" />
              </th>
              <td>
                <TableDateData type="text" defaultValue="10 July, 2019" />
              </td>
            </tr>
          </tbody>
        </TableDate>
        <TableDescription>
          <tbody>
            <tr>
              <th style={{ width: "50%", backgroundColor: "#f1f4f3" }}>
                <TableDateHeader
                  type="text"
                  defaultValue="Item & Description"
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ backgroundColor: "#f1f4f3" }}>
                <TableDateHeader type="text" defaultValue="Quantity" />
              </th>
              <th style={{ backgroundColor: "#f1f4f3" }}>
                <TableDateHeader type="text" defaultValue="Price" />
              </th>
            </tr>
            <tr>
              <td className="description_table_row" style={{ width: "100%" }}>
                <TableDateData style={{ width: "100%", height: "100%" }} />
              </td>
              <td className="description_table_row">
                <TableDateData
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleInputChange}
                />
              </td>
              <td className="description_table_row">
                <TableDateData
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </TableDescription>

        <TableTotal>
          <tbody>
            <tr>
              <th className="total_table_header">
                <TableDateHeader
                  type="text"
                  defaultValue="Subtotal"
                  className="total_table"
                />
              </th>
              <th className="total_table_percent" />
              <th className="total_table_calculate">{subtotal.toFixed(2)}</th>
            </tr>

            <tr>
              <th>
                <TableDateHeader
                  type="text"
                  defaultValue="VAT"
                  className="total_table"
                />
              </th>
              <th>
                <TableDateData
                  name="percent"
                  type="number"
                  value={values.percent}
                  onChange={handleInputChange}
                  className="total_table"
                />
              </th>
              <th>{percent.toFixed(2)}</th>
            </tr>

            <tr>
              <th>
                <TableDateHeader
                  type="text"
                  defaultValue="Total"
                  className="total_table"
                />
              </th>
              <th>
                <TableDateData className="total_table" />
              </th>
              <th>{total.toFixed(2)}</th>
            </tr>
          </tbody>
        </TableTotal>

        <FooterNotes />
        <FooterNotes
          style={{ textAlign: "right" }}
          defaultValue="Created with Billable.me"
        />
      </Pages>
    </Main>
  );
}

export default App;

const Main = styled.div`
  width: 22cm;
  max-width: 840px;
  background-color: white;
  margin: 0 auto;
`;

const Pages = styled.div`
  width: 21cm;
  max-width: 874px;
  background: #fafbfb;
  border: 1px solid #f5f7f6;
  margin: 20px;
  padding: 13px 0;
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: 50% 45%;
  grid-template-areas:
    "kind kind"
    "name address"
    "information table_date"
    "table_description table_description"
    "total total"
    "footer footer";
`;

const Kind = styled.input`
  grid-area: kind
  text-align: center;
  border: 1px solid #d4d6d9;
  border-width: 1px 0;
  padding: 6px 0;
  color: #2f5756;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 15px 0;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const CompanyName = styled.textarea`
  grid-area: name
  overflow: hidden;
  resize: none;
  font-size: 3em;
  height: 110px;
  border: none;
  background-color: #fafbfb;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const AddressCompany = styled.textarea`
  grid-area: address
  overflow: hidden;
  text-align: right;
  resize: none;
  height: 110px;
  border: none;
  background-color: #fafbfb;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const InformationCompany = styled.textarea`
  grid-area: information
  overflow: hidden;
  resize: none;
  height: 110px;
  border: none;
  background-color: #fafbfb;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const TableDate = styled.table`
  grid-area: table_date
  border: 1px solid #ced5d2;
  border-collapse: collapse;
  table-layout: auto;
  width: 1px;
`;

const TableDateHeader = styled.input`
  border: none;
  padding: 6px 0;
  color: #2f5756;
  font-weight: bold;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const TableDateData = styled.input`
  border: none;
  padding: 6px 0;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;

const TableDescription = styled.table`
  grid-area: table_description
  border: 1px solid #ced5d2;
  border-collapse: collapse;
`;

const TableTotal = styled.table`
  grid-area: total
  width: 35%
  margin-left: 58%;
  border: 1px solid #ced5d2;
  border-collapse: collapse;
`;

const OptionButton = styled.input`
  height: 26px;
  line-height: 26px;
  padding: 0 16px;
  text-decoration: none;
  background: #fff;
  color: #93b8b3;
  margin: 0 5px 0 0;
  border: 1px solid #93b8b3;
  border-radius: 0.5em;
  cursor: pointer;
`;

const FooterNotes = styled.textarea`
  grid-ares: footer;
  color: #bebebe;
  font-size: 0.9em;
  padding-bottom: 9px;
  resize: none;
  border: none;
  background-color: #fafbfb;

  &:hover {
    background-color: rgb(249, 245, 198);
  }
`;
