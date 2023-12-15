import { $Enums, Product } from "@prisma/client";
import * as React from "react";

interface EmailTemplateProps {
  products:
    | {
        id: number;
        description: string;
        category: $Enums.ProductProductCategory;
      }[]
    | undefined;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  products,
}) => (
  <div
    style={{
      background: "white",
      color: "black",
      padding: "16px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{ textAlign: "center", margin: "0 0 10px 0", cursor: "pointer" }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          margin: "0",
          padding: "0",
        }}
      >
        <a
          href="http://localhost:3000/"
          style={{ color: "#670499", textDecoration: "none" }}
        >
          NEEPCO
        </a>
      </h1>
    </div>
    <div style={{ textAlign: "center", fontSize: "18px", margin: "10px 0" }}>
      We found another tender (Made for You!)
    </div>
    <div style={{ textAlign: "center", margin: "40px 0" }}>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Hey, Vendor
      </p>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        We found a Tender belonging to the following categories:
        <ol>
          {products?.map((product) => (
            <li key={product.id}>
              {product.category}
              <br />
              {product.description}
            </li>
          ))}
        </ol>
      </p>
      <p style={{ fontSize: "14px", color: "#464646" }}>
        Visit the link below and search for 4228377(hard coded for now)
        <a
          href={"https://bidplus.gem.gov.in/all-bids"}
          style={{ color: "#670499", textDecoration: "none" }}
        >
          Click here
        </a>
      </p>
    </div>
  </div>
);

export default EmailTemplate;
