import { readFileSync } from "node:fs";

export const Card = (props: { title: string }) => {
  const content = readFileSync("card.txt", "utf8");
  return (
    <div {...props}>
      <button onClick={() => content}>{props.title}</button>
      <img src="card.png"></img>
    </div>
  );
};
