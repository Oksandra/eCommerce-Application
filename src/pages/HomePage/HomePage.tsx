import React from 'react';
import ThingsSection from '../../components/ThingsSection/ThingsSection';
import PromocodeSection from '../../components/PromocodeSection/PromocodeSection';
import CategorySection from '../../components/CategorySection/CategorySection';

const HomePage: React.FC = () => {
  return (
    <>
      <ThingsSection />
      <PromocodeSection />
      <CategorySection />
    </>
  );
};

export default HomePage;
