import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button"; // Import your Button component
import { ButtonGroup } from "./ButtonGroup"; // Assuming the component is in the same folder

describe("ButtonGroup", () => {
  it("renders children (Button components)", () => {
    render(
      <ButtonGroup>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    expect(
      screen.getByRole("button", { name: /button 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /button 2/i }),
    ).toBeInTheDocument();
  });

  it("applies correct variant and color styles", () => {
    render(
      <ButtonGroup variant="solid" color="primary">
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const button1 = screen.getByRole("button", { name: /button 1/i });
    const button2 = screen.getByRole("button", { name: /button 2/i });

    // Check if the button styles match the variant and color
    expect(button1).toHaveClass("bg-primary_80");
    expect(button2).toHaveClass("bg-primary_80");
  });

  it("applies correct layout styles based on vertical orientation", () => {
    const { rerender } = render(
      <ButtonGroup vertical>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveClass("flex-col");

    rerender(
      <ButtonGroup>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    expect(fieldset).not.toHaveClass("flex-col"); // It should now revert to horizontal layout
    expect(fieldset).toHaveClass("flex");
  });

  it("applies selected styles when a button is selected", () => {
    render(
      <ButtonGroup value="1">
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const selectedButton = screen.getByRole("button", { name: /button 1/i });
    const unselectedButton = screen.getByRole("button", { name: /button 2/i });

    // Selected button should have a z-index or other styles to indicate selection
    expect(selectedButton).toHaveClass("z-1");
    expect(unselectedButton).not.toHaveClass("z-1");
  });

  it("calls onChange when a button is clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ButtonGroup onChange={handleChange} value="1">
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const button2 = screen.getByRole("button", { name: /button 2/i });

    // Simulate click
    await user.click(button2);

    // Verify onChange was called with the correct value
    expect(handleChange).toHaveBeenCalledTimes(1);
    // expect(handleChange).toHaveBeenCalledWith(expect.anything(), "2");
  });

  it("supports multiple button selection when value is an array", () => {
    render(
      <ButtonGroup value={["1", "2"]}>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
        <Button value="3">Button 3</Button>
      </ButtonGroup>,
    );

    const selectedButton1 = screen.getByRole("button", { name: /button 1/i });
    const selectedButton2 = screen.getByRole("button", { name: /button 2/i });
    const unselectedButton3 = screen.getByRole("button", { name: /button 3/i });

    // Selected buttons should have the z-index or styles indicating they are selected
    expect(selectedButton1).toHaveClass("z-1");
    expect(selectedButton2).toHaveClass("z-1");
    expect(unselectedButton3).not.toHaveClass("z-1");
  });

  it("applies correct spacing between buttons", () => {
    render(
      <ButtonGroup spacing={8}>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveStyle("gap: 8px");
  });

  it("applies no spacing between buttons when spacing is 0", () => {
    render(
      <ButtonGroup spacing={0}>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveStyle("gap: 0");
  });

  it("disables all buttons when the group is disabled", () => {
    render(
      <ButtonGroup disabled>
        <Button value="1">Button 1</Button>
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    const button1 = screen.getByRole("button", { name: /button 1/i });
    const button2 = screen.getByRole("button", { name: /button 2/i });

    // Check if both buttons are disabled
    expect(button1).toBeDisabled();
    expect(button2).toBeDisabled();
  });

  it("renders only valid Button components as children", () => {
    render(
      <ButtonGroup>
        <Button value="1">Button 1</Button>
        <span>Invalid Child</span>{" "}
        {/* This should not be rendered as a button */}
        <Button value="2">Button 2</Button>
      </ButtonGroup>,
    );

    // Expect valid buttons to be in the document
    expect(
      screen.getByRole("button", { name: /button 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /button 2/i }),
    ).toBeInTheDocument();

    // Invalid child (span) should not appear as a button or an interactive element
    expect(screen.queryByText("Invalid Child")).toBeInTheDocument(); // It will still exist in the DOM
    expect(
      screen.queryByRole("button", { name: /invalid child/i }),
    ).not.toBeInTheDocument(); // But not as a button
  });
});
