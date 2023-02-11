import React, { forwardRef } from 'react';
import { Group, Avatar, Text, SelectItemProps } from '@mantine/core';

interface ItemProps extends SelectItemProps {
  description: string;
  image: string;
  owner: string;
}

const AutoCompleteItem: React.ForwardRefExoticComponent<ItemProps> = forwardRef<
  HTMLDivElement,
  ItemProps
>(({ description, value, image, owner, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />
      <div>
        <Text>{value}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

AutoCompleteItem.displayName = 'AutoCompleteInput';

export default AutoCompleteItem;
