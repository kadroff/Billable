import React, { useState } from "react";
import Pdf from "react-to-pdf";
import "./App.css";
import styled from "styled-components";
import TableRow from "./TableRow.js";

function App() {
  const billableItems = JSON.parse(localStorage.getItem("billable"));
  const items = JSON.parse(localStorage.getItem("billable_items"));

  const [values, setValues] = useState({
    row_count: 5,
    quantity: items !== null ? items.quantity : 1,
    price: items !== null ? items.price : 2,
    percent: items !== null ? items.percent : 12,
    company_info:
      billableItems !== null
        ? billableItems.company_info
        : "www.example.com↵info@example.com",
    company_name:
      billableItems !== null ? billableItems.company_name : "Example Co.",
    description_label:
      billableItems !== null
        ? billableItems.description_label
        : "Item & Description",
    invoice_date_label:
      billableItems !== null ? billableItems.invoice_date_label : "Date",
    invoice_number: billableItems !== null ? billableItems.invoice_number : "1",
    invoice_number_label:
      billableItems !== null ? billableItems.invoice_number_label : "Invoice #",
    kind: billableItems !== null ? billableItems.kind : "INVOICE",
    price_label: billableItems !== null ? billableItems.price_label : "Price",
    quantity_label:
      billableItems !== null ? billableItems.quantity_label : "Quantity",
    recipient_info:
      billableItems !== null
        ? billableItems.recipient_info
        : "Michael Scott Paper Company Inc.1725 Slough Avenue↵Scranton, Pennsylvania",
    invoice_date:
      billableItems !== null ? billableItems.invoice_date : "10 July, 2019",
    description_table_row:
      billableItems !== null ? billableItems.description_table_row : ""
  });
  const ref = React.createRef();
  const subtotal = values.quantity * values.price;
  const percent = (values.percent / 100) * subtotal;
  const total = subtotal + percent;

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const setLocalStorage = () => {
    const valueItems = {
      quantity: values.quantity,
      price: values.price,
      percent: values.percent
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
      description_table_row: values.description_label,
      row_count: values.row_count
    };

    localStorage.setItem("billable", JSON.stringify(billableValue));
    JSON.parse(localStorage.getItem("billable"));
    localStorage.setItem("rows", JSON.stringify(stateOptions));
  };

  const rows = JSON.parse(localStorage.getItem("rows"));
  const [stateOptions, setStateValues] = useState(rows !== null ? rows : []);
  const addRow = () => {
    setStateValues([...stateOptions, "new row"]);
  };
  const handleDelete = index => {
    stateOptions.splice(index, 1);
    return setStateValues([...stateOptions]);
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
        <CompanyDateInput
          name="invoice_date"
          defaultValue={
            billableItems != null
              ? billableItems.invoice_date
              : values.invoice_date
          }
          onChange={handleInputChange}
        />
        <NumberCompany>Invoice No:</NumberCompany>
        <CompanyDateInvoice
          name="invoice_number"
          defaultValue={
            billableItems != null
              ? billableItems.invoice_number
              : values.invoice_number
          }
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
        <TableDescription>
          <tbody>
            <tr>
              <th
                style={{
                  width: "50%",
                  backgroundColor: "#4473EA",
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  paddingLeft: "19px"
                }}
              >
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
              <th
                style={{
                  backgroundColor: "#4473EA",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px"
                }}
              >
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
                <TableDateData
                  style={{ width: "100%", height: "100%", textAlign: "left" }}
                />
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
            {stateOptions.map((row, index) => (
              <TableRow
                onDelete={index => handleDelete(index)}
                key={index}
                index={index}
              />
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
            <div>
              <tr>
                <th>
                  <TableTotalDate>Subtotal:</TableTotalDate>
                </th>
                <th className="total_table_calculate">
                  ${subtotal.toFixed(2)}
                </th>
              </tr>

              <tr>
                <th>
                  <TableTotalDate style={{ marginLeft: "45px" }}>
                    VAT
                  </TableTotalDate>
                </th>
                <th>
                  <TableDateData
                    name="percent"
                    type="number"
                    defaultValue={
                      billableItems != null ? items.percent : values.percent
                    }
                    onChange={handleInputChange}
                    className="total_table"
                    style={{ marginLeft: "-90px", fontSize: "14px" }}
                  />
                </th>

                <th className="total_table_calculate">
                  <p style={{ marginLeft: "-105px" }}>${percent.toFixed(2)}</p>
                </th>
              </tr>
            </div>
            <tr>
              <div
                style={{ borderTop: "2px solid #4473EA", paddingLeft: "20%" }}
              >
                <th>
                  <TableTotalDate>Total:</TableTotalDate>
                </th>
                <th
                  style={{ fontWeight: 600, fontSize: "21px" }}
                  className="total_table_calculate"
                >
                  ${total.toFixed(2)}
                </th>
              </div>
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
  grid-area: kind;
  text-align: center;
  font-size: 32px;
  line-height: 28px;
  padding: 48px 0;
  margin: 0 0 15px 0;
  border: none;
`;

const CompanyName = styled.textarea`
  grid-area: name;
  overflow: hidden;
  resize: none;
  font-size: 21px;
  height: 20px;
  border: none;
  padding-left: 52px;
`;

const AddressCompany = styled.textarea`
  grid-area: address;
  overflow: hidden;
  text-align: right;
  resize: none;
  padding-right: 51px;
  height: 110px;
  color: #4473ea;
  font-size: 12px;
  border: none;

  &:hover {
    background-color: #f9fafe;
  }
`;

const DateCompany = styled.p`
  grid-area: name;
  font-size: 13px;
  padding-top: 25px;
  padding-left: 53px;
`;

const NumberCompany = styled.p`
  grid-area: name;
  font-size: 13px;
  padding-top: 46px;
  padding-left: 53px;
`;

const CompanyDateInput = styled.input`
  grid-area: name;
  overflow: hidden;
  resize: none;
  height: 15px;
  width: 105px;
  font-size: 13px;
  font-weight: bold;
  margin-left: 130px;
  margin-top: 38px;
  border: none;
`;

const CompanyDateInvoice = styled.input`
  grid-area: name;
  overflow: hidden;
  resize: none;
  height: 15px;
  width: 105px;
  font-size: 13px;
  font-weight: bold;
  margin-left: 122px;
  margin-top: 58px;
  border: none;
`;

const InformationCompany = styled.textarea`
  grid-area: information;
  overflow: hidden;
  resize: none;
  height: 110px;
  font-size: 12px;
  padding-left: 61px;
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
  font-size: 14px;
  text-align: right;
`;

const TableDescription = styled.table`
  grid-area: table_description
  width: 86%;
  height: 107px;
  border-collapse: collapse;
  margin: 0 auto;
  
  
`;

const TableTotal = styled.table`
  grid-area: total
  width: 35%
  margin-left: 58%;
  font-size: 12px;
`;

const TableTotalDate = styled.p`
  font-size: 17px;
  font-weight: 400;
  margin-left: 80px;
`;

const OptionButtonSave = styled.input`
  width: 92px;
  height: 30px;
  cursor: pointer;
  margin-left: 501px;
  background: #4473ea;
  font-size: 16px;
  color: white;
  border: 1px solid #4473ea;
  border-radius: 15px;

  &:hover {
    background: #4473ea;
  }
`;

const OptionButtonPdf = styled.input`
  width: 144px;
  height: 32px;
  margin-top: 23px;
  margin-left: 25px;
  cursor: pointer;
  background: white;
  font-size: 16px;
  color: #4473ea;
  border: 1px solid #4473ea;
  border-radius: 15px;
`;

const AddRowButton = styled.input`
  font-size: 0.8em;
  outline: none;
  text-decoration: none;
  background: none;
  border: none;
  color: #4473ea;
  cursor: pointer;
`;
