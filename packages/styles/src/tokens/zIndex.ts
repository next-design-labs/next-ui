export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  sticky: 1000,
  fab: 1050,
  banner: 1100,
  overlay: 1200,
  modal: 1300,
  dropdown: 1400,
  popover: 1500,
  tooltip: 1600,
  skipLink: 1700,
  toast: 1800,
};

export type HvzIndex = keyof typeof zIndex;
