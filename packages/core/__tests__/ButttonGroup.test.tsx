import { NuiButton, NuiButtonGroup } from "@next-design-labs/next-ui-core";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/utils";
import { describe, expect, it, vi } from "vitest";

describe("NuiButtonGroup", () => {
  it("renders children and handles onChange event", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <NuiButtonGroup onChange={handleChange}>
        <NuiButton value="1">Button 1</NuiButton>
        <NuiButton value="2">Button 2</NuiButton>
      </NuiButtonGroup>,
    );

    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();

    await user.click(screen.getByText("Button 1"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies vertical layout and spacing classes correctly", () => {
    render(
      <NuiButtonGroup vertical spacing={8}>
        <NuiButton value="1">Button 1</NuiButton>
        <NuiButton value="2">Button 2</NuiButton>
      </NuiButtonGroup>,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveClass("flex-col");
    expect(fieldset).toHaveStyle({ gap: "8px" });
  });

  it("sets selected state correctly", () => {
    render(
      <NuiButtonGroup value="2">
        <NuiButton value="1">Button 1</NuiButton>
        <NuiButton value="2">Button 2</NuiButton>
        <NuiButton value="3">Button 3</NuiButton>
      </NuiButtonGroup>,
    );

    expect(screen.getByText("Button 2")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("renders icon-only buttons", () => {
    const Icon1 = () => <svg data-testid="icon1" />;
    const Icon2 = () => <svg data-testid="icon2" />;

    render(
      <NuiButtonGroup iconOnly>
        <NuiButton value="1">
          <Icon1 />
        </NuiButton>
        <NuiButton value="2">
          <Icon2 />
        </NuiButton>
      </NuiButtonGroup>,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toContainElement(screen.getByTestId("icon1"));
    expect(buttons[1]).toContainElement(screen.getByTestId("icon2"));
  });
});
