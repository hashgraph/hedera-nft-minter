import React, { useMemo } from 'react';
import map from 'lodash/map';
import renderValue from '@/utils/helpers/renderValue';
import CollapseList from '@/components/shared/collapse-list';
import { Attribute } from '@/utils/entity/NFT-Metadata';

type EditionAttributesProps = {
  attributes?: Attribute[];
};

export default function EditionAttributes({
  attributes,
}: EditionAttributesProps) {

  const hasNoAttributes = useMemo(() => (
    attributes && attributes.length === 0 && (
      <p>No attributes yet</p>
    )
  ), [attributes])

  const renderAttributesRows = useMemo(() => (
      <>
        {map(attributes, (el) => (
            <p>
              <span>{renderValue(el.trait_type)}:</span>
              {renderValue(el.value)}
            </p>
        ))}
      </>
  ), [attributes]);

  const renderEditionAttributesComponent = useMemo(() => (
    hasNoAttributes
      ? <p>No attributes yet</p>
      : renderAttributesRows
  ), [hasNoAttributes, renderAttributesRows])

  return (
    <CollapseList
      data={[
        {
          tab_title: 'Attributes',
          component: renderEditionAttributesComponent,
        },
      ]}
    />
  );
}
