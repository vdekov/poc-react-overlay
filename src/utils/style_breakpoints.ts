const Breakpoints = {
  mobile: 600,
  tablet: 960
};

export const mobileQuery = `(max-width: ${Breakpoints.mobile}px)`;
export const tabletQuery = `(min-width: ${Breakpoints.mobile + 1}px)`;
export const desktopQuery = `(min-width: ${Breakpoints.tablet + 1}px)`;

export const mobile = `@media only screen and ${mobileQuery} `;
export const tablet = `@media only screen and ${tabletQuery}`;
export const desktop = `@media only screen and ${desktopQuery}`;
