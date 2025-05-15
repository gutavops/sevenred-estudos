type Props = {
    message: string;
};
  
function Message({message}: Props) {
    return <p>{message}</p>;
}

export default Message;