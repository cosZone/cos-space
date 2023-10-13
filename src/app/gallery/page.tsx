'use client';

import { tempPetTapeName } from '@/constants/temp';

export default function Gallery() { 
  return (
    <>
		{tempPetTapeName.map((name) => <h2 key={name} className="text-2xl font-bold">{name}</h2>)}
    </>
  );
}
