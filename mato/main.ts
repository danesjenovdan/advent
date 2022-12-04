if (Deno.args.length !== 2) {
  console.log(
    "Please provide day (1-25) as first and part (one|two) as second argument.",
  );
} else {
  const [day, part] = Deno.args;

  const inputFilename = `./${day}/input.txt`;
  const solver = (await import(`./${day}/part-${part}.ts`)).default;

  const file = await Deno.readTextFile(inputFilename);
  const lines = file.split("\n");
  lines.pop();

  console.log(`Solution for day ${day}, part ${part}:\n${solver(lines)}`);
}
