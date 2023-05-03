import React from 'react';
import FreshChat from 'react-freshchat';

const FRESHDESK_TOKEN = 'd639bd70-b55b-4ebc-9a3e-4103af5ba606';

export const SupportWidget = () => {
  const isClient = typeof window !== 'undefined';
  return (
    <div className="">
      {isClient && (
        <FreshChat
          token={FRESHDESK_TOKEN}
          widgetUuid="3e51ce38-7051-4c4c-b4cb-935acceff8ce"
          host="https://forsagesupport.freshchat.com"
          onInit={(widget) => {
            widget.user.setProperties({
              '❇️ Platform': 'Puma Labs NFT',
            });
          }}
        />
      )}
    </div>
  );
};
