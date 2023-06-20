import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
`;

const Header = styled.header`
  height: 60px;
  background-color: #333
`

const Footer = styled.footer`
  height: 60px;
  background-color: #333
`
interface HeadingProps {
  theme: 'dark' | 'light',
  as: 'h1' | 'h2' | 'h3'
}

const Heading: FC<PropsWithChildren<HeadingProps>> = ({ theme, as, children }) => {
  const Element = styled[as]`
    color: ${(theme === 'dark') && '#f7f7f7' || (theme === 'light') && '#333'} 
  `

  return <Element>{children}</Element>
}

const Main = styled.main`
  min-height: calc(100vh - 120px);
`

const Small = styled.small`
  color: #f7f7f7;
`

export function App() {
  return (
    <AppLayout>
      <Header>
        <Heading as="h2" theme="dark">
          My shiny new Pokedex.
        </Heading>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <Small>
          Made by Abraham.
        </Small>
      </Footer>
    </AppLayout>
  );
}

export default App;
