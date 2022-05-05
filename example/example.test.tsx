import { fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  DecoratedOnClassComponent,
  DecoratedOnRenderComponent
} from "./example";

const components = [DecoratedOnRenderComponent, DecoratedOnClassComponent];

it("renders and increases after click", () => {
  for (const Class of components) {
    const { queryByText, getByText, unmount } = render(<Class />);
    expect(queryByText(/Hello - 0/i)).toBeTruthy();
    fireEvent.click(getByText(/Hello - 0/i));
    expect(queryByText(/Hello - 1/i)).toBeTruthy();
    unmount();
  }
});
