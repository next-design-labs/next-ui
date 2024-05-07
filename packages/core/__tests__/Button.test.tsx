import { NuiButton } from "@next-design-labs/next-ui-core";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/utils";
import { describe, expect, it, vi } from "vitest";

describe("Button Component", () => {
  it("renders with default properties", () => {
    render(<NuiButton>Default Button</NuiButton>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Default Button");
  });

  it("applies custom class names", () => {
    render(<NuiButton className="custom-class">Button</NuiButton>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("is disabled when disabled prop is true", () => {
    render(<NuiButton disabled>Disabled Button</NuiButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<NuiButton onClick={onClick}>Clickable Button</NuiButton>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <NuiButton onClick={onClick} disabled>
        Disabled Button
      </NuiButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    try {
      await user.click(button);
    } catch (e) {
      const error = e as Error;
      // Optional: Assert that the pointer-event restriction is raised
      expect(error.message).toContain("pointer-events: none");
    }
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders left and right icons", () => {
    const LeftIcon = () => <svg data-testid="left-icon" />;
    const RightIcon = () => <svg data-testid="right-icon" />;
    render(
      <NuiButton>
        <LeftIcon />
        Button
        <RightIcon />
      </NuiButton>,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("handles loading state with aria-busy", () => {
    render(<NuiButton loading>Loading Button</NuiButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("handles focus and blur events", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(
      <NuiButton onFocus={onFocus} onBlur={onBlur}>
        Focusable Button
      </NuiButton>,
    );

    await user.tab();
    expect(onFocus).toHaveBeenCalled();
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});
