import React, { useState } from 'react';

interface Region {
  name: string;

}

const regions: Region[] = [
  { name: 'Europe' },
  { name: 'Asia' },
  { name: 'Africa' },
  { name: 'Americas' },
  { name: 'Oceania' },
];

interface FilterButtonProps {
  filterByRegion: (region: string) => void;
  classname1: string;
  classname2: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterByRegion,classname1, classname2 }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className={classname1} onClick={toggleFilters}>Filter by Region </div>
      {showFilters && (
        <div className={classname2} id="regionFilters">
          {regions.map(region => (
            <div
              key={region.name}
              className="region"
              onClick={() => {
                filterByRegion(region.name);
                toggleFilters(); 
              }}
            >
              {region.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
