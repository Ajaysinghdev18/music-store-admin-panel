// Dependencies
import { Box, Checkbox, IconButton, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Api
import { TicketApi } from '../../../../apis';
// Icons
import {
  ArchiveIcon,
  ArchiveListIcon,
  ArchiveOutlinedIcon,
  CancelledIcon,
  CancelledOutlinedIcon,
  ProcessingIcon,
  ProcessingOutLinedIcon,
  RecycleIcon,
  SolvedIcon,
  SolvedOutLinedIcon,
  StarredFavorite,
  StarredIcon,
  StarredOutlinedIcon,
  TicketIcon,
  TicketOutlinedIcon
} from '../../../../assets/icons';
// Components
import { ConfirmDialog, IColumn, RoundedButton, Table } from '../../../../components';
import { PAGE_LIMIT, ROUTES } from '../../../../constants';
// Constants
import { TICKET_STATUS } from '../../../../shared/enums';
// Types
import { ITicket, Order } from '../../../../shared/types';
import {
  setArchieveTicketBtnClicked,
  setDelTicketBtnClicked,
  setFavTicketBtnClicked,
  setSearchExp
} from '../../../../store/actions/header.actions';
import { getArchieveBtnClicked, getDelBtnClicked, getFavBtnClicked } from '../../../../store/selectors';
// Styles
import * as S from './styles';

// Data
const TICKET_TABS = [
  {
    label: 'New Tickets',
    status: TICKET_STATUS.NEW,
    icon: {
      default: <TicketIcon />,
      active: <TicketOutlinedIcon />
    }
  },
  {
    label: 'Processing',
    status: TICKET_STATUS.PROCESSING,
    icon: {
      default: <ProcessingIcon />,
      active: <ProcessingOutLinedIcon />
    }
  },
  {
    label: 'Solved',
    status: TICKET_STATUS.SOLVED,
    icon: {
      default: <SolvedIcon />,
      active: <SolvedOutLinedIcon />
    }
  },
  {
    label: 'Cancelled',
    status: TICKET_STATUS.CANCELLED,
    icon: {
      default: <CancelledIcon />,
      active: <CancelledOutlinedIcon />
    }
  }
];

export const TicketListPage: FC = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [ticketStatus, setTicketStatus] = useState(TICKET_STATUS.NEW);
  const [selectedRows, setSelectedRows] = useState<ITicket[]>([]);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [numSelected, setNumSelected] = useState<number>(0);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();

  // Get navigate form hook
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  // Constants
  const columns: IColumn[] = [
    {
      field: 'name',
      title: 'Name',
      align: 'center'
    },
    {
      field: 'email',
      title: 'Email',
      align: 'center'
    },
    {
      field: 'subject',
      title: 'Subject',
      align: 'center'
    },
    {
      field: 'category',
      title: 'Category',
      align: 'center'
    },
    {
      field: 'id',
      title: 'Ticket Number',
      align: 'center'
    },
    {
      title: 'Date',
      align: 'right',
      render: (row) => (
        <S.DateColumn>
          <Box>{moment(row.createdAt).format('YYYY.MM.DD - hh:mm:ss')}</Box>
        </S.DateColumn>
      )
    }
  ];

  // Fetch data
  const fetchData = () => {
    return TicketApi.readAll({
      query: {
        status: ticketStatus
      },
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      }
    })
      .then((res) => {
        setTickets(res.tickets);
        setTotalPage(res.pagination.total);
        setSelectedRows([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete confirm handler

  // Delete handler

  // Delete handler
  const handleMobileDelete = (id: string) => {
    setSelectedProductId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  // change status handler
  const handleChangeStatus = (status, data) => {
    const newTicket = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'status') {
        newTicket.append(key, status);
      } else {
        // @ts-ignore
        newTicket.append(key, value);
      }
    });

    TicketApi.update(data.id, newTicket)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  // Archive handler
  const handleArchive = (e, row) => {
    e.stopPropagation();
    handleChangeStatus(TICKET_STATUS.ARCHIVE, row);
  };

  // Archive handler
  const handleStarted = (e, row) => {
    e.stopPropagation();
    const status = row.status != TICKET_STATUS.STARRED ? TICKET_STATUS.STARRED : TICKET_STATUS.PROCESSING;
    handleChangeStatus(status, row);
  };

  // Constants
  const handleChange = (event, newValue: TICKET_STATUS) => {
    setTicketStatus(newValue);
  };

  // Sort
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // Page change handler
  const handlePageChange = (value: number) => {
    setPageNumber(value);
  };
  const handleChangeChecked = (isChangeCheckedAll = false, row) => {
    const rows = [...selectedRows];
    let checkedCnt = numSelected;
    if (isChangeCheckedAll) {
      setCheckedAll(!isCheckedAll);
      if (!isCheckedAll) {
        setSelectedRows(tickets);
        checkedCnt = tickets.length;
      } else {
        setSelectedRows([]);
        checkedCnt = 0;
      }
    } else {
      if (selectedRows.some((item) => item.id === row.id)) {
        setCheckedAll(!isCheckedAll);
        setSelectedRows(rows.filter((v) => v !== row));
        checkedCnt--;
      } else {
        checkedCnt++;
        rows.push(row);
        setSelectedRows(rows);
      }
    }
    setNumSelected(checkedCnt);
  };

  // Row click handler
  const handleRowClick = (id: string) => {
    navigate(ROUTES.DOCUMENT.TICKET.DETAIL.replace(':id', id));
  };

  // On mounted
  useEffect(() => {
    fetchData();
  }, [pageNumber, order, orderBy]);

  // On ticket status changed
  useEffect(() => {
    fetchData();
  }, [ticketStatus]);

  return (
    <>
      <Box display={'flex'} gap={'0.5rem'} paddingY={'1rem'}>
        {TICKET_TABS.map((item, index) => (
          <RoundedButton
            key={index}
            label={isMobile ? '' : item.label}
            onClick={() => setTicketStatus(item.status)}
            outline={item.status !== ticketStatus}
            // icon={item.status === ticketStatus ? item.icon.active : item.icon.default}
          />
        ))}
      </Box>
      <S.TableWrapper>
        <Table
          title="Ticket"
          data={tickets}
          columns={columns}
          pageNumber={pageNumber}
          totalPage={totalPage}
          onPageChange={handlePageChange}
          order={order}
          orderBy={orderBy}
          onSort={handleSort}
          onRowClick={handleRowClick}
          onArchive={isMobile ? handleArchive : undefined}
          onDelete={isMobile ? handleMobileDelete : undefined}
          onView={isMobile ? handleRowClick : undefined}
          onFavorite={isMobile ? handleStarted : undefined}
          selectedRows={selectedRows}
          numSelected={numSelected}
          OnChangeChecked={handleChangeChecked}
        />
      </S.TableWrapper>
    </>
  );
};
