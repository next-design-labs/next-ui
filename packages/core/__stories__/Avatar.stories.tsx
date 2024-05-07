import { NuiAvatar, NuiAvatarGroup } from "@next-design-labs/next-ui-core";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NuiAvatar> = {
  title: "Components/Avatar",
  component: NuiAvatar,
  args: {
    size: "md",
    radius: "full",
    variant: "solid",
    color: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof NuiAvatar>;

// Basic usage
export const Basic: Story = {
  args: {
    fallback: "JD",
  },
};

// With Image
export const WithImage: Story = {
  args: {
    src: "./avatar-04.webp",
    alt: "Sarah	Chapman",
    fallback: "SC",
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NuiAvatar size="xs" fallback="JD" />
      <NuiAvatar size="sm" fallback="JD" />
      <NuiAvatar size="md" fallback="JD" />
      <NuiAvatar size="lg" fallback="JD" />
      <NuiAvatar size="xl" fallback="JD" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NuiAvatar color="primary" fallback="A" />
      <NuiAvatar color="sky" fallback="B" />
      <NuiAvatar color="indigo" fallback="C" />
      <NuiAvatar color="violet" fallback="D" />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NuiAvatar variant="solid" fallback="JD" />
      <NuiAvatar variant="outline" fallback="JD" />
    </div>
  ),
};

// Radius
export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NuiAvatar radius="none" fallback="JD" />
      <NuiAvatar radius="sm" fallback="JD" />
      <NuiAvatar radius="md" fallback="JD" />
      <NuiAvatar radius="lg" fallback="JD" />
      <NuiAvatar radius="full" fallback="JD" />
    </div>
  ),
};

// Groups
export const Groups: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Basic Group */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Basic Group</h3>
        <NuiAvatarGroup>
          <NuiAvatar src="./avatar-01.webp" alt="User 1" fallback="U1" />
          <NuiAvatar src="./avatar-02.webp" alt="User 2" fallback="U2" />
          <NuiAvatar src="./avatar-03.webp" alt="User 3" fallback="U3" />
          <NuiAvatar src="./avatar-04.webp" alt="User 4" fallback="U4" />
        </NuiAvatarGroup>
      </div>

      {/* With Max Limit */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">With Max Limit (3)</h3>
        <NuiAvatarGroup max={3}>
          <NuiAvatar src="./avatar-01.webp" alt="User 1" fallback="U1" />
          <NuiAvatar src="./avatar-02.webp" alt="User 2" fallback="U2" />
          <NuiAvatar src="./avatar-03.webp" alt="User 3" fallback="U3" />
          <NuiAvatar src="./avatar-04.webp" alt="User 4" fallback="U4" />
          <NuiAvatar
            src="https://i.pravatar.cc/300?img=5"
            alt="User 5"
            fallback="U5"
          />
        </NuiAvatarGroup>
      </div>

      {/* Different Sizes */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Different Sizes</h3>
        <div className="flex flex-col gap-4">
          <NuiAvatarGroup size="sm" max={4}>
            <NuiAvatar src="./avatar-01.webp" alt="User 1" fallback="U1" />
            <NuiAvatar src="./avatar-02.webp" alt="User 2" fallback="U2" />
            <NuiAvatar src="./avatar-03.webp" alt="User 3" fallback="U3" />
            <NuiAvatar src="./avatar-04.webp" alt="User 4" fallback="U4" />
            <NuiAvatar
              src="https://i.pravatar.cc/300?img=5"
              alt="User 5"
              fallback="U5"
            />
          </NuiAvatarGroup>
          <NuiAvatarGroup size="md" max={4}>
            <NuiAvatar src="./avatar-01.webp" alt="User 1" fallback="U1" />
            <NuiAvatar src="./avatar-02.webp" alt="User 2" fallback="U2" />
            <NuiAvatar src="./avatar-03.webp" alt="User 3" fallback="U3" />
            <NuiAvatar src="./avatar-04.webp" alt="User 4" fallback="U4" />
            <NuiAvatar
              src="https://i.pravatar.cc/300?img=5"
              alt="User 5"
              fallback="U5"
            />
          </NuiAvatarGroup>
          <NuiAvatarGroup size="lg" max={4}>
            <NuiAvatar src="./avatar-01.webp" alt="User 1" fallback="U1" />
            <NuiAvatar src="./avatar-02.webp" alt="User 2" fallback="U2" />
            <NuiAvatar src="./avatar-03.webp" alt="User 3" fallback="U3" />
            <NuiAvatar src="./avatar-04.webp" alt="User 4" fallback="U4" />
            <NuiAvatar
              src="https://i.pravatar.cc/300?img=5"
              alt="User 5"
              fallback="U5"
            />
          </NuiAvatarGroup>
        </div>
      </div>
    </div>
  ),
};
