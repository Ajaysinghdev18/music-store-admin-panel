// Dependencies
import { Components, darken } from '@mui/material';

// Icons
import { ArrowDownIcon, CheckboxIcon, CheckboxOutlineIcon, RadioIcon, RadioOutlineIcon } from '../assets/icons';

// Override components
const components: Components = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        headline: 'h2',
        title: 'h2',
        subtitle: 'h4',
        label: 'h5',
        body1: 'p',
        body2: 'p',
        button: 'span',
        caption: 'span',
        overline: 'span'
      }
    }
  },
  MuiButton: {
    defaultProps: {
      color: 'success',
      variant: 'contained'
    },
    styleOverrides: {
      root: {
        textTransform: 'none'
      },
      sizeMedium: {
        height: 40,
        borderRadius: 8,
        padding: '0px 24px'
      },
      contained: {
        boxShadow: 'none',
        ':hover': {
          boxShadow: 'none'
        }
      }
    },
    variants: [
      {
        props: { size: 'medium' },
        style: ({ theme }) => ({
          '.MuiButton-startIcon': {
            marginLeft: theme.spacing(-8)
          }
        })
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          ':hover': {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            backgroundColor: theme.palette.action.hover
          }
        })
      },
      {
        props: { color: 'success', variant: 'text' },
        style: ({ theme }) => ({
          ':hover': {
            color: theme.palette.success.main,
            borderColor: 'none',
            backgroundColor: 'transparent',
            '.MuiButton-startIcon': {
              marginLeft: theme.spacing(-12),
              marginRight: theme.spacing(16)
            }
          },
          '.MuiButton-startIcon': {
            transitionDuration: '300ms'
          }
        })
      },
      {
        props: { color: 'success', variant: 'outlined' },
        style: ({ theme }) => ({
          border: `1px solid ${theme.palette.action.hover}`,
          backgroundColor: theme.palette.action.hover
        })
      },
      {
        props: { color: 'success', variant: 'contained' },
        style: ({ theme }) => ({
          color: theme.palette.common.white,
          border: `1px solid ${theme.palette.success.main}`
        })
      }
    ]
  },
  MuiIconButton: {
    styleOverrides: {
      sizeMedium: {
        width: 40,
        height: 40
      }
    },
    variants: [
      {
        props: { color: 'default' },
        style: ({ theme }) => ({
          color: theme.palette.action.active,
          ':hover': {
            backgroundColor: theme.palette.action.hover
          },
          svg: {
            color: theme.palette.text.primary
          }
        })
      }
    ]
  },
  MuiInputLabel: {
    defaultProps: {
      color: 'success',
      shrink: true
    },
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          ...theme.typography.overline,
          transform: 'translate(16px, -7px)'
        })
      },
      {
        // @ts-ignore
        props: { variant: 'alone' },
        style: ({ theme }) => ({
          padding: theme.spacing(0, 4),
          backgroundColor: theme.palette.common.white,
          zIndex: 1
        })
      }
    ]
  },
  MuiOutlinedInput: {
    defaultProps: {
      color: 'success'
    },
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          padding: theme.spacing(0),
          '.MuiSelect-icon': {
            right: 16,
            top: 'calc(50% - 5px)',
            color: theme.palette.text.secondary
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.secondary,
            padding: theme.spacing(0, 12),
            legend: {
              maxWidth: '100%',
              span: {
                ...theme.typography.overline,
                padding: theme.spacing(0, 4)
              }
            }
          }
        })
      },
      {
        props: { size: 'medium' },
        style: ({ theme }) => ({
          ...theme.typography.body2,
          '.MuiOutlinedInput-input': {
            padding: theme.spacing(16, 16, 17),
            '&.MuiSelect-select': {
              padding: theme.spacing(15, 16)
            }
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: 8
          }
        })
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          ':hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.success.main
            }
          },
          '&.Mui-error': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main
            }
          }
        })
      }
    ]
  },
  MuiFormHelperText: {
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          ...theme.typography.caption,
          marginTop: theme.spacing(4),
          marginLeft: theme.spacing(16)
        })
      }
    ]
  },
  MuiSwitch: {
    defaultProps: {
      color: 'success'
    },
    styleOverrides: {
      root: {
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          transitionDuration: '300ms',
          transitionProperty: 'margin',
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            transitionDuration: '300ms'
          },
          '&.Mui-checked': {
            '& + .MuiSwitch-track': {
              opacity: 1,
              border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5
            }
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {},
          '&.Mui-disabled .MuiSwitch-thumb': {
            opacity: 0.7
          }
        }
      },
      sizeMedium: {
        width: 52,
        height: 32,
        '& .MuiSwitch-switchBase': {
          margin: 8,
          '&.Mui-checked': {
            margin: 4,
            transform: 'translateX(20px)',
            '& .MuiSwitch-thumb': {
              width: 24,
              height: 24
            }
          },
          '& .MuiSwitch-thumb': {
            width: 16,
            height: 16
          }
        },
        '& .MuiSwitch-track': {
          borderRadius: 32 / 2
        }
      }
    },
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                borderColor: theme.palette.success.main
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: theme.palette.common.white
              }
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: theme.palette.text.secondary
            }
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            border: `2px solid ${theme.palette.text.secondary}`,
            backgroundColor: theme.palette.text.disabled
          }
        })
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                borderColor: theme.palette.success.main
              }
            }
          }
        })
      }
    ]
  },
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      IconComponent: ArrowDownIcon
    }
  },
  MuiCheckbox: {
    defaultProps: {
      icon: <CheckboxOutlineIcon />,
      checkedIcon: <CheckboxIcon />
    },
    variants: [
      {
        props: { color: 'primary', size: 'medium' },
        style: ({ theme }) => ({
          color: theme.palette.text.secondary,
          '&.Mui-checked': {
            color: theme.palette.text.primary
          }
        })
      }
    ]
  },
  MuiRadio: {
    defaultProps: {
      icon: <RadioOutlineIcon />,
      checkedIcon: <RadioIcon />
    },
    variants: [
      {
        props: { color: 'primary', size: 'medium' },
        style: ({ theme }) => ({
          color: theme.palette.text.secondary,
          '&.Mui-checked': {
            color: theme.palette.text.primary
          }
        })
      }
    ]
  },
  MuiChip: {
    styleOverrides: {
      sizeMedium: {
        borderRadius: 8
      }
    },
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          ...theme.typography.label
        })
      },
      {
        props: { size: 'medium' },
        style: ({ theme }) => ({
          '.MuiChip-avatar': {
            width: 16,
            height: 16,
            marginLeft: theme.spacing(12),
            marginRight: theme.spacing(0)
          }
        })
      },
      {
        props: { color: 'default', variant: 'filled' },
        style: ({ theme }) => ({
          ...theme.typography.label,
          backgroundColor: theme.palette.action.active,
          ':hover': {
            backgroundColor: darken(theme.palette.action.hover, 0.02)
          }
        })
      }
    ]
  },
  MuiCard: {
    styleOverrides: {
      root: {
        padding: 24,
        borderRadius: 16,
        boxShadow: 'none'
      }
    }
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {
        variant: 'title',
        color: 'text.secondary'
      }
    },
    styleOverrides: {
      root: {
        padding: 0
      },
      action: {
        margin: 0
      }
    }
  },
  MuiPagination: {
    defaultProps: {
      shape: 'rounded',
      siblingCount: 0
    },
    variants: [
      {
        props: {},
        style: {
          '.MuiPaginationItem-ellipsis': {
            display: 'grid',
            alignItems: 'center'
          }
        }
      }
    ]
  },

  MuiTabs: {
    variants: [
      {
        props: {},
        style: () => ({
          '.MuiTabs-indicator': {
            height: 0
          }
        })
      }
    ]
  },

  MuiTab: {
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          ...theme.typography.label,
          borderRadius: 8,
          padding: theme.spacing(8, 16, 8, 16),
          justifyContent: 'flex-start',
          flexDirection: 'row',
          minHeight: 40,
          '.MuiTab-iconWrapper': {
            width: 24,
            height: 24,
            margin: theme.spacing(0, 8, 0, 0)
          },
          ':hover': {
            backgroundColor: darken(theme.palette.action.hover, 0.02)
          },
          '&.Mui-selected': {
            backgroundColor: darken(theme.palette.action.active, 0.02),
            color: theme.palette.common.black
          }
        })
      },
      {
        props: { color: 'default' },
        style: ({ theme }) => ({
          ...theme.typography.label,
          backgroundColor: theme.palette.action.active,
          ':hover': {
            backgroundColor: darken(theme.palette.action.hover, 0.02)
          }
        })
      }
    ]
  },

  MuiTableCell: {
    variants: [
      {
        props: {},
        style: ({ theme }) => ({
          borderBottom: 'none',
          padding: theme.spacing(12, 12, 12, 0),
          ...theme.typography.body1
        })
      }
    ]
  }
};

// Export components
export default components;
