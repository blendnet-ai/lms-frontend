import ReactPlayer from "react-player";


interface Props {
  url: string;
}

function Learning({ url }: Props) {
  return (
    <div>
      <ReactPlayer url={url} />
    </div>
  );
}

export default Learning;
