// Dependencies
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Apis
import { CategoriesApi } from '../../apis';
// Components
import { CategoryForm, ConfirmDialog, IColumn, ProductsView, Table } from '../../components';
import { PAGE_LIMIT } from '../../constants';
import { CategoryModel } from '../../shared/models';
import { ICategory, Order } from '../../shared/types';
import { setSearchExp } from '../../store/actions/header.actions';
import { getSearchExp } from '../../store/selectors';

// Create categories page
export const CategoryListPage: FC = () => {
  // States
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [visibleCategoryForm, setVisibleCategoryForm] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visibleProductsView, setVisibleProductsView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const searchExp = useSelector(getSearchExp);
  // Fetch categories
  const fetchCategories = () => {
    setIsLoading(true);
    CategoriesApi.readAll({
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      },
      query: {
        name: searchExp
      }
    })
      .then((res) => {
        setCategories(res.categories.map((category) => new CategoryModel(category)));
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // New handler
  const handleNew = () => {
    setVisibleCategoryForm(true);
    setSelectedCategory(undefined);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    setSelectedCategoryId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  // Delete confirm handler
  const handleDeleteConfirmed = () => {
    CategoriesApi.remove(selectedCategoryId as string)
      .then(() => fetchCategories())
      .catch((err) => console.log(err));
  };

  // Edit handler
  const handleEdit = (id: string) => {
    CategoriesApi.read(id)
      .then((res) => {
        setSelectedCategory(res?.category);
        setVisibleCategoryForm(true);
      })
      .catch((err) => console.log(err));
  };

  // Page change handler
  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // View more click handler
  // const handleViewMoreClick = (id: string) => {
  //   setSelectedCategoryId(id);
  //   setVisibleProductsView(true);
  // };

  // On mounted
  useEffect(() => {
    dispatch(setSearchExp(''));
    fetchCategories();
  }, []);

  // On pageNumber, order, orderBy
  useEffect(() => {
    fetchCategories();
  }, [pageNumber, order, orderBy]);

  // Constants
  const columns: IColumn[] = [
    {
      field: 'name',
      title: 'Name'
    },
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'createdAt',
      title: 'Created At',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    },
    {
      field: 'updatedAt',
      title: 'Updated At',
      render: (row) => moment(row.updatedAt).format('HH:mm - DD MMMM YYYY')
    }
    // {
    //   field: 'products',
    //   title: 'Products',
    //   render: (row) => (
    //     <Box display='flex' alignItems="center">
    //       <AvatarGroup max={5} total={row.products.length}>
    //         {
    //           row.products.map((product: ProductModel, index: number) => (
    //             <Avatar alt={product.id} src={product.avatarUrl} key={`product-${index}`}/>
    //           ))
    //         }
    //       </AvatarGroup>
    //       <Button
    //         color="primary"
    //         variant="text"
    //         size="small"
    //         onClick={() => handleViewMoreClick(row.id)}
    //         sx={{ ml: 1 }}
    //       >
    //         View All
    //       </Button>
    //     </Box>
    //   )
    // }
  ];

  // Return categories page
  return (
    <>
      <Table
        title="Categories"
        columns={columns}
        data={categories}
        totalPage={totalPage}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
        order={order}
        orderBy={orderBy}
        isLoading={isLoading}
        onSort={handleSort}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onNew={handleNew}
      />
      <CategoryForm
        visible={visibleCategoryForm}
        setVisible={setVisibleCategoryForm}
        category={selectedCategory}
        onSubmitted={fetchCategories}
      />
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
      <ProductsView visible={visibleProductsView} setVisible={setVisibleProductsView} categoryId={selectedCategoryId} />
    </>
  );
};
