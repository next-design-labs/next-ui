import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the button with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-button-primary");
  });

  it("renders with a left icon", () => {
    render(<Button leftIcon={<span>Icon</span>}>Click Me</Button>);
    const icon = screen.getByText("Icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders with a right icon", () => {
    render(<Button rightIcon={<span>Icon</span>}>Click Me</Button>);
    const icon = screen.getByText("Icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders with a loader when loading is true", () => {
    render(<Button loading>Click Me</Button>);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
  });

  it('applies the "aria-pressed" attribute when selected', () => {
    render(<Button selected>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("calls the onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant styles", () => {
    const { rerender } = render(<Button variant="outline">Click Me</Button>);
    let button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("bg-transparent");

    rerender(<Button variant="solid">Click Me</Button>);
    button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("text-white");
  });

  it("applies the correct color styles", () => {
    const { rerender } = render(<Button color="secondary">Click Me</Button>);
    let button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("bg-neutralStrong");

    rerender(<Button color="positive">Click Me</Button>);
    button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("bg-success");
  });

  it("applies the correct size styles", () => {
    const { rerender } = render(<Button size="sm">Click Me</Button>);
    let button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("min-h-6");

    rerender(<Button size="lg">Click Me</Button>);
    button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("min-h-11");
  });

  it("renders correctly when iconOnly is true", () => {
    render(<Button iconOnly leftIcon={<span>Icon</span>} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-icon", "true");
    expect(button).not.toHaveTextContent("Click Me");
  });

  it("applies the correct radius styles", () => {
    const { rerender } = render(<Button radius="sm">Click Me</Button>);
    let button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("rounded-base");

    rerender(<Button radius="lg">Click Me</Button>);
    button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("rounded-full");
  });

  it("renders both left and right icons", () => {
    render(
      <Button
        leftIcon={<span>LeftIcon</span>}
        rightIcon={<span>RightIcon</span>}
      >
        Click Me
      </Button>,
    );
    const leftIcon = screen.getByText("LeftIcon");
    const rightIcon = screen.getByText("RightIcon");
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
  });

  it("responds to keyboard interactions", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    await user.keyboard("{Enter}");
    await user.keyboard("{Space}");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
