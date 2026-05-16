import {
  createContext,
  useContext,
} from 'react';

type PaginationContextType = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalCount:(count: number) => void;
};

export const PaginationContext =
  createContext<
    PaginationContextType | undefined
  >(undefined);

export function usePagination() {
  const context = useContext(
    PaginationContext
  );

  if (!context) {
    throw new Error(
      'usePagination must be used inside PaginationContext.Provider'
    );
  }

  return context;
}