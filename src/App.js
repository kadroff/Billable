import React, { useState } from "react";
import Pdf from "react-to-pdf";
import "./App.css";
import styled from "styled-components";

function App() {
  const [values, setValues] = useState({
    quantity: 1,
    price: 2,
    percent: 12,
    company_info: "www.example.com↵info@example.com",
    company_name: "Example Co.",
    description_label: "Item & Description",
    invoice_date_label: "Date",
    invoice_number: "1",
    invoice_number_label: "Invoice #",
    kind: "INVOICE",
    notes_b: "Created with Billable.me",
    price_label: "Price",
    quantity_label: "Quantity",
    recipient_info:
      "Michael Scott Paper Company Inc.1725 Slough Avenue↵Scranton, Pennsylvania",
    subtotal_label: "Subtotal",
    tax_name: "VAT",
    tax_percentage: "14",
    total_label: "Total",
    invoice_date: "10 July, 2019",
    description_table_row: ""
  });
  const ref = React.createRef();
  const subtotal = values.quantity * values.price;
  const percent = (values.percent / 100) * subtotal;
  const total = subtotal + percent;
  const items = JSON.parse(localStorage.getItem("billable_items"));
  const billableItems = JSON.parse(localStorage.getItem("billable"));

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const setLocalStorage = () => {
    const valueItems = {
      quantity: values.quantity,
      price: values.price
    };
    localStorage.setItem("billable_items", JSON.stringify(valueItems));
    JSON.parse(localStorage.getItem("billable_items"));

    const billableValue = {
      company_info: values.company_info,
      company_name: values.company_name,
      description_label: values.description_label,
      invoice_date_label: values.invoice_date_label,
      invoice_number: values.invoice_number,
      invoice_number_label: values.invoice_number_label,
      kind: values.kind,
      notes_b: values.notes_b,
      price_label: values.price_label,
      quantity_label: values.quantity_label,
      recipient_info: values.recipient_info,
      subtotal_label: values.subtotal_label,
      tax_name: values.tax_name,
      total_label: values.total_label,
      invoice_date: values.invoice_date,
      description_table_row: values.description_label
    };

    localStorage.setItem("billable", JSON.stringify(billableValue));
    JSON.parse(localStorage.getItem("billable"));
  };

  return (
    <Main>
      {/* Convert to PDF */}
      <Pdf targetRef={ref} filename="invoice.pdf">
        {({ toPdf }) => (
          <OptionButton type="button" value="Download PDF" onClick={toPdf} />
        )}
      </Pdf>

      <OptionButton type="button" value="Save" onClick={setLocalStorage} />

      <Pages ref={ref}>
        <Kind
          type="text"
          defaultValue={
            billableItems != null ? billableItems.kind : values.kind
          }
          name="kind"
          onChange={handleInputChange}
        />
        <CompanyName
          name="company_name"
          onChange={handleInputChange}
          defaultValue={
            billableItems != null
              ? billableItems.company_name
              : values.company_name
          }
        />
        <AddressCompany
          defaultValue={
            billableItems != null
              ? billableItems.company_info
              : values.company_info
          }
          name="company_info"
          onChange={handleInputChange}
        />
        <InformationCompany
          defaultValue={
            billableItems != null
              ? billableItems.recipient_info
              : values.recipient_info
          }
          name="recipient_info"
          onChange={handleInputChange}
        />
        <TableDate>
          <tbody>
            <tr>
              <th>
                <TableDateHeader
                  type="text"
                  name="invoice_number_label"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.invoice_number_label
                      : values.invoice_number_label
                  }
                />
              </th>
              <td>
                <TableDateData
                  type="text"
                  name="invoice_number"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.invoice_number
                      : values.invoice_number
                  }
                />
              </td>
            </tr>

            <tr>
              <th>
                <TableDateHeader
                  type="text"
                  name="invoice_date_label"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.invoice_date_label
                      : values.invoice_date_label
                  }
                />
              </th>
              <td>
                <TableDateData
                  type="text"
                  name="invoice_date"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.invoice_date
                      : values.invoice_date
                  }
                />
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
                  defaultValue={
                    billableItems != null
                      ? billableItems.description_label
                      : values.description_label
                  }
                  name="description_label"
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </th>
              <th style={{ backgroundColor: "#f1f4f3" }}>
                <TableDateHeader
                  type="text"
                  name="quantity_label"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.quantity_label
                      : values.quantity_label
                  }
                />
              </th>
              <th style={{ backgroundColor: "#f1f4f3" }}>
                <TableDateHeader
                  type="text"
                  name="price_label"
                  onChange={handleInputChange}
                  defaultValue={
                    billableItems != null
                      ? billableItems.price_label
                      : values.price_label
                  }
                />
              </th>
            </tr>
            <tr>
              <td
                className="description_table_row"
                name="description_table_row"
                defaultValue={
                  billableItems != null
                    ? billableItems.description_table_row
                    : values.description_table_row
                }
                onChange={handleInputChange}
                style={{ width: "100%" }}
              >
                <TableDateData style={{ width: "100%", height: "100%" }} />
              </td>
              <td className="description_table_row">
                <TableDateData
                  type="number"
                  name="quantity"
                  defaultValue={
                    items != null ? items.quantity : values.quantity
                  }
                  onChange={handleInputChange}
                />
              </td>
              <td className="description_table_row">
                <TableDateData
                  type="number"
                  name="price"
                  defaultValue={items != null ? items.price : values.price}
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
                  defaultValue={
                    billableItems != null
                      ? billableItems.subtotal_label
                      : values.subtotal_label
                  }
                  className="total_table"
                  name="subtotal_label"
                  onChange={handleInputChange}
                />
              </th>
              <th className="total_table_percent" />
              <th className="total_table_calculate">{subtotal.toFixed(2)}</th>
            </tr>

            <tr>
              <th>
                <TableDateHeader
                  type="text"
                  defaultValue={
                    billableItems != null
                      ? billableItems.tax_name
                      : values.tax_name
                  }
                  name="tax_name"
                  onChange={handleInputChange}
                  className="total_table"
                />
              </th>
              <th>
                <TableDateData
                  name="percent"
                  type="number"
                  value={
                    billableItems != null
                      ? billableItems.percent
                      : values.percent
                  }
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
                  defaultValue={
                    billableItems != null
                      ? billableItems.total_label
                      : values.total_label
                  }
                  name="total_label"
                  onChange={handleInputChange}
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
          name="notes_b"
          onChange={handleInputChange}
          defaultValue={
            billableItems != null ? billableItems.notes_b : values.notes_b
          }
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
