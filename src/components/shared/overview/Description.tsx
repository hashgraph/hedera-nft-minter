import React from 'react';
import renderValue from '@/utils/helpers/renderValue';
import EditionAttributes from '@/components/shared/overview/EditionAttributes';
import { Attribute } from '@/utils/entity/NFT-Metadata';

type DescriptionProps = {
  creator?: string,
  description?: string;
  attributes?: Attribute[];
};

export default function Description({
  creator,
  description,
  attributes,
}: DescriptionProps) {

  return (
    <div className='overview__description overview--box'>
      <div className='overview__description__header'>
        Created by {renderValue(creator)}
      </div>
      <hr className='hr-2' />
      <p className='overview__description__text'>
        Description: <span>{renderValue(description)}</span>
      </p>
      <hr className='hr-2' />
      <EditionAttributes
        attributes={attributes}
      />
    </div>
  );
}


