import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { ConnectButton, CurrentUserBadge } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { Notifications } from '../Notifications';
import useWindowDimensions from '../../utils/layout';
import { MenuOutlined } from '@ant-design/icons';
import { useMeta } from '../../contexts';

const UserActions = () => {
  const { publicKey } = useWallet();
  const { whitelistedCreatorsByCreator, store } = useMeta();
  const pubkey = publicKey?.toBase58() || '';

  const canCreate = useMemo(() => {
    return (
      store?.info?.public ||
      whitelistedCreatorsByCreator[pubkey]?.info?.activated
    );
  }, [pubkey, whitelistedCreatorsByCreator, store]);

  return (
    <>
      {store && (
        <>
          {/* <Link to={`#`}>
            <Button className="app-btn">Bids</Button>
          </Link> */}
          {canCreate ? (
            <Link to={`/art/create`}>
              <Button className="app-btn">Create</Button>
            </Link>
          ) : null}
          <Link to={`/auction/create/0`}>
            <Button className="connector" type="primary">
              Sell
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

const DefaultActions = ({ vertical = false }: { vertical?: boolean }) => {
  const { connected } = useWallet();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
      }}
    >
      <Link to={`/`}>
        <Button className="app-btn">Auctions</Button>
      </Link>
      <Link to={`/artworks`}>
        <Button className="app-btn">
          {connected ? 'My Items' : 'Artworks'}
        </Button>
      </Link>
      <Link to={`/artists/FCpetEsYrhY8FVdPJtCVkYuC2f1wMNNFgV3avLyyJ8Bs`}>
        <Button className="app-btn">Creator</Button>
      </Link>
      <a href="https://twitter.com/twdigitalart?ref_src=twsrc%5Etfw"><Button className="app-btn"><img src="twitter_logo.png" alt="Twitter" width="40" height="40"/></Button></a>
      <a href="https://www.instagram.com/twdigitalart/"><Button className="app-btn"><img src="ig_logo.png" alt="Instagram" width="40" height="40"/></Button></a>
      <a href="https://discord.gg/VCKpndUvpV"><Button className="app-btn"><img src="discord_logo.png" alt="Discord" width="40" height="40"/></Button></a>
    </div>
  );
};

const MetaplexMenu = () => {
  const { width } = useWindowDimensions();
  const { connected } = useWallet();

  if (width < 768)
    return (
      <>
        <Dropdown
          arrow
          placement="bottomLeft"
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item>
                <Link to={`/`}>
                  <Button className="app-btn">Auctions</Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`/artworks`}>
                  <Button className="app-btn">
                    {connected ? 'My Items' : 'Artworks'}
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`/artists/FCpetEsYrhY8FVdPJtCVkYuC2f1wMNNFgV3avLyyJ8Bs`}>
                  <Button className="app-btn">Creator</Button>
                </Link>
              </Menu.Item>

              <Menu.Item>
                <a href="https://twitter.com/twdigitalart?ref_src=twsrc%5Etfw"><Button className="app-btn">Twitter</Button></a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://www.instagram.com/twdigitalart/"><Button className="app-btn">Instagram</Button></a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://discord.gg/VCKpndUvpV"><Button className="app-btn">Discord</Button></a>
              </Menu.Item>
            </Menu>
          }
        >
          <MenuOutlined style={{ fontSize: '1.4rem' }} />
        </Dropdown>
      </>
    );

  return <DefaultActions />;
};

export const AppBar = () => {
  const { connected } = useWallet();

  return (
    <>
      <div className="app-left app-bar-box">
        {window.location.hash !== '#/analytics' && <Notifications />}
        <div className="divider" />
        <MetaplexMenu />
      </div>
      {connected ? (
        <div className="app-right app-bar-box">
          <UserActions />
          <CurrentUserBadge
            showBalance={false}
            showAddress={false}
            iconSize={24}
          />
        </div>
      ) : (
        <ConnectButton type="primary" allowWalletChange />
      )}
    </>
  );
};
