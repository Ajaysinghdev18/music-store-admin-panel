// Export category type
export interface ICategory {
  id?: string;
  name: string;
  visibleInNav: boolean;
  subCategories?: string[];
  createdAt?: string;
  updatedAt?: string;
}
