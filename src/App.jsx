// src/App.js
import React from 'react';
import MyTable from './components/MyTable';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { userData } from './data/data';

const App = () => {
  const data = React.useMemo(() => [
    ...userData
  ], []);

  return (
    <div className='max-w-screen-xl mx-auto p-2'>
      <div className='flex py-5 items-center justify-between'>
        <h1 className='text-xl font-bold'>TanStack Table Example</h1>
        <span className='p-2 bg-white dark:bg-black cursor-pointer rounded-full'>
          <ThemeSwitcher />
        </span>
      </div>
      <MyTable data={data} />
    </div>
  );
};

export default App;