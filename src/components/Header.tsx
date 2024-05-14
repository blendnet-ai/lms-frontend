import "./../styles/Header.css";

type HeaderProps = {
  content: JSX.Element;
};

function Header(props: HeaderProps) {
  return <div className="Header">{props.content}</div>;
}

export default Header;
