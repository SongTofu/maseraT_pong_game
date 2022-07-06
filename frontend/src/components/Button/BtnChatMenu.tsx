import React from "react";

interface BtnChatProps {
  className: string;
  tag: string;
  disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function BtnChatMenu({
  className,
  tag,
  disabled,
  onClick,
}: BtnChatProps): JSX.Element {
  // 일단 연결하고 다시 해보자.
  // const [disabled, setDisabled] = useState(false);

  // const handleDisabled = (my: number, target: number) => {
  // if (my === 2) {
  //   if (target === 2) {
  //     setDisabled(true);
  //   }
  //   else {
  //     setDisabled(false);
  //   }
  // }
  // else if (my === 1) {

  // }
  // };
  return (
    <>
      <button
        className={className + (disabled ? " opacity-25" : "")}
        onClick={onClick}
        disabled={disabled}
        //   disabled={
        //     myAuth === 2
        //       ? targetAuth === 2
        //         ? true
        //         : false
        //       : myAuth === 1
        //       ? targetAuth === 2
        //         ? true
        //         : false
        //       : false
        //   }
      >
        {tag}
      </button>
    </>
  );
}

export default BtnChatMenu;
