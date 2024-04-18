import "./../styles/Container.css";

type Props = {
  icon: JSX.Element;
  title: string;
  content: JSX.Element;
};

const Container = ({ icon, content, title }: Props) => {
  return (
    <div className="container">
      <div className="top-header">
        {icon}
        <div className="heading">{title}</div>
      </div>
      {content}
      <div className="footer"></div>
    </div>
  );
};

export default Container;
