import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';
import { useMemo } from 'react';
import { List, type RowComponentProps  } from 'react-window';
type CountryRowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

function CountryRow(
  props: RowComponentProps<CountryRowProps>
) {
  const {
    index,
    style,
    countries,
    selectedYear,
    selectedColumns,
  } = props;

  const country = countries[index];

  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}
type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
  return countries
    .filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else {
        const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
        const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    });
  },[ countries,searchQuery,selectedYear,selectedRegion,sortField, sortOrder])

  return (
     <List
  rowComponent={CountryRow}
  rowCount={filteredCountries.length}
  rowHeight={300}
  style={{
    height: 800,
    width: '100%',
  }}
    rowProps={{
    countries: filteredCountries,
    selectedYear,
    selectedColumns,
  }}
/>
  );
};
