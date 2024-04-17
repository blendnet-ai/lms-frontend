import "./../styles/Container.css";

type Props = {
  icon: JSX.Element;
  content: JSX.Element;
};

const Container = ({ icon, content }: Props) => {
  return (
    <div className="container">
      <div className="top-header">
        {icon}
        <div className="heading">Summary</div>
      </div>
      {content}
      <div className="footer"></div>
    </div>
  );
};

export default Container;
