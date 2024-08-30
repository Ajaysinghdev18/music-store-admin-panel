import { createTheme } from '@mui/material';
import { CSSProperties } from 'react';

import breakpoints from './breakpoints';
import components from './components';
import typography from './typography';
import variants from './variants';

declare module '@mui/material' {
  // allow configuration using `createTheme`
  interface Theme {
    name: string;
    header: any;
    sidebar: any;
    body: any;
  }
  interface ThemeOptions {
    name: string;
    header: any;
    sidebar: any;
    body: any;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display: CSSProperties;
    headline: CSSProperties;
    title: CSSProperties;
    subtitle: CSSProperties;
    label: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display?: CSSProperties;
    headline?: CSSProperties;
    title?: CSSProperties;
    subtitle?: CSSProperties;
    label?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    headline: true;
    title: true;
    subtitle: true;
    label: true;
  }
}

declare module '@mui/material/InputLabel' {
  interface InputLabelPropsVariantOverrides {
    alone: true;
  }
}

const theme = (variant: any) =>
  createTheme({
    spacing: 1,
    breakpoints: breakpoints,
    palette: variant.palette,
    components: components,
    name: variant.name,
    header: variant.header,
    sidebar: variant.sidebar,
    body: variant.body,
    typography
  });

const themes = variants.map((variant) => theme(variant));

export default themes;
