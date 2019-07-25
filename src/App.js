import React, { useState } from "react";
import Pdf from "react-to-pdf";
import "./App.css";
import styled from "styled-components";
import TableRow from "./TableRow.js";

function App() {
  const [values, setValues] = useState({
    rows: [{}],
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

  const [stateOptions, setStateValues] = useState([]);

  const addRow = () => {
    const newElement = 1;
    setStateValues([...stateOptions, newElement]);
  };

  return (
    <Main>
      {/* Convert to PDF */}
      <Pdf targetRef={ref} filename="invoice.pdf">
        {({ toPdf }) => (
          <OptionButtonPdf type="button" value="Download PDF" onClick={toPdf} />
        )}
      </Pdf>

      <OptionButtonSave type="button" value="Save" onClick={setLocalStorage} />

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
        <DateCompany>Date Issued:</DateCompany>
        <CompanyDateInput defaultValue="14 июня" />
        <NumberCompany>Invoice No:</NumberCompany>
        <CompanyDateInvoice defaultValue="8917777" />
        <InformationCompany
          defaultValue={
            billableItems != null
              ? billableItems.recipient_info
              : values.recipient_info
          }
          name="recipient_info"
          onChange={handleInputChange}
        />
        <TableDescription>
          <tbody>
            <tr>
              <th style={{ width: "50%", backgroundColor: "#4473EA" }}>
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
              <th style={{ backgroundColor: "#4473EA" }}>
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
              <th style={{ backgroundColor: "#4473EA" }}>
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

            {stateOptions.map(row => (
              <TableRow id={stateOptions.length} />
            ))}

            <tr>
              <td>
                <AddRowButton type="button" onClick={addRow} value="[ + ]" />
              </td>
            </tr>
          </tbody>
        </TableDescription>

        <TableTotal>
          <tbody>
            <tr>
              <th>
                <TableTotalDate>Subtotal:</TableTotalDate>
              </th>
              <th className="total_table_calculate">{subtotal.toFixed(2)}</th>
            </tr>

            <tr>
              <th>
                <TableTotalDate>VAT</TableTotalDate>
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
                <TableTotalDate>Total:</TableTotalDate>
              </th>
              <th>{total.toFixed(2)}</th>
            </tr>
          </tbody>
        </TableTotal>
      </Pages>
    </Main>
  );
}

export default App;

const Main = styled.div`
  width: 21cm;
  max-width: 840px;
  background-color: #f9fafe;
  margin: 0 auto;
`;

const Pages = styled.div`
  width: 21cm;
  max-width: 840px;
  background: white;
  border: 1px solid #f5f7f6;
  margin-top: 34px;
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
  font-size: 24px;
  line-height: 28px;
  padding: 40px 0;
  margin: 0 0 15px 0;
  border: none
`;

const CompanyName = styled.textarea`
  grid-area: name
  overflow: hidden;
  resize: none;
  font-size: 16px;
  height: 20px;
  border: none;
  padding-left: 40px; 
`;

const AddressCompany = styled.textarea`
  grid-area: address
  overflow: hidden;
  text-align: right;
  resize: none;
  padding-right: 33px;
  height: 110px;
  color: #4473EA
  font-size: 10px;
  border: none;

  &:hover {
    background-color: #F9FAFE;
  }
`;

const DateCompany = styled.p`
  grid-area: name;
  font-size: 10px;
  padding-top: 40px;
  padding-left: 40px;
`;

const NumberCompany = styled.p`
  grid-area: name;
  font-size: 10px;
  padding-top: 60px;
  padding-left: 40px;
`;

const CompanyDateInput = styled.input`
  grid-area: name;
  overflow: hidden;
  resize: none;
  height: 15px;
  width: 105px;
  font-size: 10px;
  font-weight: bold;
  margin-left: 100px;
  margin-top: 47px;
  border: none;
`;

const CompanyDateInvoice = styled.input`
  grid-area: name;
  overflow: hidden;
  resize: none;
  height: 15px;
  width: 105px;
  font-size: 10px;
  font-weight: bold;
  margin-left: 100px;
  margin-top: 67px;
  border: none;
`;

const InformationCompany = styled.textarea`
  grid-area: information
  overflow: hidden;
  resize: none;
  height: 110px;
  font-size: 10px;
  padding-left: 40px;
  border: none;
`;

const TableDateHeader = styled.input`
  border: none;
  padding: 6px 0;
  color: white;
  background: #4473ea;
  font-weight: bold;

  &:hover {
    background: #4473ea;
  }
`;

const TableDateData = styled.input`
  border: none;
  padding: 6px 0;
`;

const TableDescription = styled.table`
  grid-area: table_description
  border-collapse: collapse;
`;

const TableTotal = styled.table`
  grid-area: total
  width: 35%
  margin-left: 58%;
  font-size: 12px;
`;

const TableTotalDate = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-left: 80px;
`;

const TotalDateHeader = styled.input`
  border: none;
  padding: 6px 0;
  color: #333333;
  font-size: 12px;
`;

const OptionButtonSave = styled.input`
  width: 72px;
  height: 25px;
  cursor: pointer;
  background: #4473ea;
  font-size: 12px;
  color: white;
  border: 1px solid #4473ea;
  border-radius: 15px;
`;

const OptionButtonPdf = styled.input`
  width: 112px;
  height: 25px;
  cursor: pointer;
  background: white;
  font-size: 12px;
  color: #4473ea;
  border: 1px solid #4473ea;
  border-radius: 15px;
`;

const AddRowButton = styled.input`
  font-size: 0.8em;
  outline: none;
  text-decoration: none;
`;
