import chalkAnimation from "chalk-animation";

function sleep(): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

export default async function title(): Promise<void> {
  const gameTitle =
    chalkAnimation.neon(`\n    +-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+
    |W|e|l|c|o|m|e| |T|o| |A|d|v|e|n|t|u|r|e| |G|a|m|e|
    +-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+-+-+-+ +-+-+-+-+\n`);
  await sleep();
  gameTitle.stop();
}