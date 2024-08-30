import { blue, grey } from '@mui/material/colors';

const darkVariant = {
  name: 'Dark',
  palette: {
    primary: {
      main: blue[800],
      contrastText: '#FFF'
    }
  },
  header: {
    color: '#FFF',
    background: '#FFF',
    search: {
      color: grey[800]
    }
  },
  sidebar: {
    color: '#FFF',
    background: '#0a1929',
    header: {
      color: '#FFF',
      background: '#0a1929',
      brand: {
        color: '#FFFFFF'
      }
    }
  },
  body: {
    background: '#f5f5ff'
  }
};

const lightVariant = {
  name: 'Light',
  palette: {
    error: {
      main: '#FC5454'
    },
    warning: {
      main: '#FBBD2D'
    },
    info: {
      main: '#30419B'
    },
    success: {
      main: '#000000'
    },
    text: {
      primary: '#000000',
      secondary: '#707070',
      disabled: '#E1E1E1',
      bluegray: '#f5f5ff',
      blue: '#2659ed'
    },
    action: {
      accent: '#f5f5ff',
      active: 'rgba(200, 200, 255)',
      hover: '#F2F6FC'
    },
    background: {
      default: '#f5f5ff',
      black: '#161719'
    },
    blue: {
      main: '#2659ed'
    },
    black: {
      main: '#161719'
    },
    bluegray: {
      main: '#f5f5ff'
    },
    darkblue: {
      main: '#234198'
    }
  },
  header: {
    color: '#FFF',
    background: '#013e35',
    search: {
      color: grey[800]
    }
  },
  sidebar: {
    color: '#FFF',
    background: '#013e35',
    header: {
      color: '#FFF',
      background: {
        main: '#013e35',
        black: '#161719'
      },
      brand: {
        color: '#FFFFFF'
      }
    }
  },
  body: {
    background: '#F9F9FC'
  }
};

const variants = [lightVariant, darkVariant];

export default variants;
