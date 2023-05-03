import React from 'react';
import { MENU_LINKS } from 'helpers/constants';
import { CustomLink, Button } from 'components';

export const Menu = () => {
  return (
    <div className="flex items-center space-x-5">
      {MENU_LINKS?.map((item, itemIndex) => {
        return (
          <CustomLink href={item?.link} className="" key={itemIndex}>
            <Button type="transparent" className="!py-3 !px-5">
              {item?.title}
            </Button>
          </CustomLink>
        );
      })}
    </div>
  );
};
