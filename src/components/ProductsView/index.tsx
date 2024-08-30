// Dependencies
import { Card, CardContent, CardMedia, Dialog, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ReactCarousel from 'react-owl-carousel3';

// Apis
import { CategoriesApi } from '../../apis';
// Interfaces
import { getThumbnailImage } from '../../utils/common';

interface IProductViewProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  categoryId?: string;
}

// Export products-view component
export const ProductsView: FC<IProductViewProps> = ({ visible, categoryId, setVisible }) => {
  // States
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    if (categoryId) {
      CategoriesApi.read(categoryId)
        .then((res) => setProducts(res.category.products))
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

  // Return products-view component
  return (
    <Dialog open={visible} onClose={() => setVisible(false)}>
      {products && products.length > 0 && (
        <ReactCarousel loop nav dot={'true'} margin={20} items={1} navText={['<', '>']}>
          {products.map((product, index) => (
            <Card
              key={`product-${index}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 'none',
                pb: 3
              }}
            >
              <CardMedia
                component="img"
                height="200"
                width="auto"
                image={getThumbnailImage(product)}
                alt={product.filename}
              />
              <CardContent sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ReactCarousel>
      )}
    </Dialog>
  );
};
