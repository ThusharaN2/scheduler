import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "components/Button";

afterEach(cleanup);

describe("Button",()=>{
it("renders without crashing", () => {
  render(<Button />);
})
