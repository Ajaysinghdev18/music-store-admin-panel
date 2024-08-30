import { Box, Button } from '@mui/material';
import styled from 'styled-components';

export const DRPContent = styled(Box)`
  background: white;
  border: 0.125rem, solid, ${(props) => props.theme.palette.success.main};
`;

export const DateColumn = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const DateRangeContainer = styled(Box)``;

export const PanelContainer = styled(Box)`
  position: relative;
`;

export const MonthSelectContent = styled(Box)`
  padding: 1.5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  svg {
    color: ${(props) => props.theme.palette.success.main};
  }
`;

export const TimeRangeContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  &:first-child {
    border-right: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
  }
  width: 100%;
  padding: 3rem 1.5rem 0 1.5rem;
  input {
    text-align: center;
  }
`;

export const ActionContainter = styled(Box)`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  background: white;
  border-top: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
  width: 100%;
`;

export const PanelWrapper = styled(Box)`
  position: absolute;
  top: 0.625rem;
  left: 0;
  padding: 1.8rem;
  background: white;
  z-index: 999;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.25);
  border-radius: 0.625rem;
  border: 0.125rem solid ${(props) => props.theme.palette.success.main};
  width: 100%;

}
`;

export const DateRangePickerContent = styled(Box)`
  display: flex;
  justify-content: center;

  .rdrCalendarWrapper {
    width: 100%;
  }

  .rdrDateRangeWrapper {
    width: 100%;
  }
  .date-range-picker-calendar1 {
    &:first-child {
      border-right: 0.0675rem solid ${(props) => props.theme.palette.text.disabled}!important;
    }
  }

  .rdrMonth {
    width: 100%;
    height: 100%;
    padding: 0 1.5rem;
    .rdrMonthName {
      display: none;
    }
    .rdrWeekDays {
      background: ${(props) => props.theme.palette.action.hover};
      border-radius: 0.5rem;
    }
    .rdrDays {
      .rdrDay {
        padding: 0 0.525rem !important;
        .rdrInRange {
          background: ${(props) => props.theme.palette.action.hover};
          border-radius: 1.75rem;
          & ~ .rdrDayNumber span {
            color: ${(props) => props.theme.palette.common.black};
          }
          & ~ .rdrDayNumber span:after {
            background: ${(props) => props.theme.palette.common.black};
          }
        }
      }
      .rdrDayToday {
        .rdrDayNumber span:after {
          background: ${(props) => props.theme.palette.success.main};
        }
      }

      .rdrDayHovered {
        .rdrDayNumber span {
          color: ${(props) => props.theme.palette.common.white}!important;
        }
        .rdrDayNumber span:after {
          background: ${(props) => props.theme.palette.common.white}!important;
        }
      }
      .rdrDayInPreview {
        border-radius: 3.125rem;
        background: ${(props) => props.theme.palette.action.hover};
        border-color: transparent;
        z-index: 0;
        & ~ .rdrDayNumber span {
          color: ${(props) => props.theme.palette.common.black}!important;
        }
        & ~ .rdrDayNumber span:after {
          background: ${(props) => props.theme.palette.common.black};
        }
      }
      .rdrStartEdge,
      .rdrEndEdge,
      .rdrDayStartPreview,
      .rdrDayEndPreview {
        background: ${(props) => props.theme.palette.success.main};
        border-radius: 3.125rem;
        border-color: transparent;
        z-index: 0;
        color: ${(props) => props.theme.palette.common.white}!important;
        & ~ .rdrDayNumber span:after {
          background: ${(props) => props.theme.palette.common.white};
        }
      }
    }
  }
  .rdrMonthAndYearWrapper {
    display: none;
  }
  .rdrDateDisplayWrapper {
    display: none;
  }
`;

export const SaveButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: black;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: black;
    color: white;
    border-radius: 2rem;
    border: none;
  }
`;

export const CancelButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: transparent;
  border: 0.0675rem solid black;
  color: black;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: transparent;
    border: 0.0675rem solid black;
    color: black;
    border-radius: 2rem;
  }
`;
