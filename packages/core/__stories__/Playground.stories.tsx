import {
  NuiAvatar,
  NuiButton,
  NuiInput,
  NuiTag,
  NuiTypography,
  useUUID,
} from "@next-design-labs/next-ui-core";
import {
  BookmarkSimple,
  PersonSimpleCircle,
  Star,
  UploadSimple,
} from "@phosphor-icons/react";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof NuiInput> = {
  title: "Theme/Playground",
  decorators: [
    (Story: StoryFn) => (
      <div className="flex-col space-y-4 m-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    verticalCentered: false,
  },
};

export default meta;

// Avatar Showcase Component
const AvatarShowcase = () => {
  const avatars = [
    {
      id: 1,
      src: "https://i.pravatar.cc/300?img=26",
      alt: "User 1",
      fallback: "U1",
    },
    {
      id: 2,
      src: "https://i.pravatar.cc/300?img=13",
      alt: "User 2",
      fallback: "U2",
    },
  ];

  const solidAvatars = [
    { id: 1, variant: "solid", color: "primary", fallback: "V" },
    { id: 2, variant: "solid", color: "blue", fallback: "BG" },
    { id: 3, variant: "solid", color: "primary", fallback: "V" },
    { id: 4, variant: "solid", color: "blue", fallback: "BG" },
  ];

  const outlineAvatars = [
    { id: 1, variant: "outline", color: "primary", fallback: "V" },
    { id: 2, variant: "outline", color: "blue", fallback: "BG" },
    { id: 3, variant: "outline", color: "primary", fallback: "V" },
    { id: 4, variant: "outline", color: "blue", fallback: "BG" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Circular Avatars */}
      <div className="flex gap-4">
        {avatars.map(({ id, src, alt, fallback }) => (
          <NuiAvatar
            key={id}
            src={src}
            alt={alt}
            fallback={fallback}
            size="lg"
          />
        ))}
        {solidAvatars.map(({ id, variant, color, fallback }) => (
          <NuiAvatar
            key={id}
            variant={variant as "solid" | "outline"}
            color={color}
            fallback={fallback}
            size="lg"
          />
        ))}
      </div>
      {/* Row 2: Outline Avatars */}
      <div className="flex gap-4">
        {avatars.map(({ id, src, alt, fallback }) => (
          <NuiAvatar
            key={id}
            src={src}
            alt={alt}
            fallback={fallback}
            size="lg"
            variant="outline"
          />
        ))}
        {outlineAvatars.map(({ id, variant, color, fallback }) => (
          <NuiAvatar
            key={id}
            variant={variant as "solid" | "outline"}
            color={color}
            fallback={fallback}
            size="lg"
          />
        ))}
      </div>
    </div>
  );
};

// Main Playground Story
export const Playground = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Column 1: User Profile Section */}
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg border border-slate-200">
        {/* User Profile Header */}
        <div className="flex items-center gap-4">
          <NuiAvatar
            src="https://i.pravatar.cc/300?img=25"
            alt="John Doe"
            fallback="JD"
            size="lg"
          />
          <div>
            <NuiTypography variant="title3">John Doe</NuiTypography>
            <NuiTypography variant="caption1" className="text-slate-500">
              Product Designer
            </NuiTypography>
          </div>
        </div>

        {/* Search Form */}
        <div className="flex gap-4">
          <NuiInput placeholder="Search" className="flex-grow" />
          <NuiButton radius="md">Submit</NuiButton>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-3">
          {["Seamless", "Flexible", "Open Source", "Accessible"].map(
            (tag, index) => (
              <NuiTag key={tag} color={index % 2 === 0 ? "sky" : "indigo"}>
                {tag}
              </NuiTag>
            ),
          )}
        </div>

        {/* Icon Buttons */}
        <div className="flex gap-2">
          {[Star, BookmarkSimple, PersonSimpleCircle, UploadSimple].map(
            (Icon, index) => (
              <NuiButton
                key={useUUID()}
                radius="md"
                variant={index > 1 ? "outline" : "solid"}
                iconOnly
              >
                <Icon size={16} />
              </NuiButton>
            ),
          )}
        </div>

        {/* Avatar Showcase */}
        <AvatarShowcase />
      </div>

      {/* Column 2: Signup Form */}
      <form>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg max-w-md w-full border border-slate-200">
          <NuiTypography variant="title2" className="text-center mb-4">
            Signup
          </NuiTypography>
          <div className="flex flex-col gap-6">
            {["Full name", "Email", "Password"].map((label) => (
              <div key={label} className="flex flex-col gap-2">
                <NuiTypography variant="label">{label}</NuiTypography>
                <NuiInput
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  type={label === "Password" ? "password" : "text"}
                  autoComplete="on"
                />
              </div>
            ))}
            <NuiButton radius="md">Create account</NuiButton>
            <NuiTypography variant="caption1" className="text-center">
              By creating an account, you agree to our{" "}
              <a href="#terms" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </NuiTypography>
          </div>
        </div>
      </form>
    </div>
  ),
};
