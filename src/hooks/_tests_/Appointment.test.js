import React from "react";
import { render } from "@testing-library/react";
import Appointment from "../Appointments/index"

afterEach(cleanup);

describe("Appointment",()=>{
  it("renders without crashing", () => {
    render(<Appointment />);
  });

}) 