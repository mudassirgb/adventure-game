import chalk from "chalk";
import inquirer from "inquirer";

export default async function gameMasterHead(): Promise<void> {
  // Game Variable
  let maxEnemyHealth: number = 75;
  const enemyAttackDamage: number = 25;
  const enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];

  // Player Variables
  let playerHealth: number = 100;
  let playerHealthPortion: number = 3;
  const playerAttackDamage: number = 50;
  let healthPortionHealAmount: number = 30;
  const healthPortionDropChance: number = 50;

  let running: boolean = true;

  while (running) {
    const arrivedEnemy: string =
      enemies[Math.floor(Math.random() * (3 - 0 + 1)) + 0];
    let arrivedEnemyHP: number =
      Math.floor(Math.random() * (maxEnemyHealth - 50 + 1)) + 50;
    console.log(chalk.redBright(`\n\t# ${arrivedEnemy} has appeared! # \n`));
    let runningAwayFromBattle = false;

    while (arrivedEnemyHP > 0) {
      console.log(`Your HP: ${playerHealth}`);
      console.log(`${arrivedEnemy}'s HP: ${arrivedEnemyHP}`);

      const userChoice = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "What would you like to do? ",
          choices: ["1. Attack", "2. Drink Health Portion", "3. Run!"],
        },
      ]);

      if (userChoice.choice === "1. Attack") {
        const enemyGivenDamage: number = Math.floor(
          Math.random() * (enemyAttackDamage - 1 + 1) + 1
        );
        const playerGivenDamage: number = Math.floor(
          Math.random() * (playerAttackDamage - 1 + 1) + 1
        );

        arrivedEnemyHP -= playerGivenDamage;
        playerHealth -= enemyGivenDamage;

        console.log(
          `\t > ${chalk.yellowBright(
            `You Strike the ${arrivedEnemy} for ${playerGivenDamage} damage.`
          )}`
        );
        console.log(
          `\t > ${chalk.bgMagentaBright(
            `You received ${enemyGivenDamage} in retaliation!`
          )}`
        );

        if (playerHealth < 1) {
          console.log(
            chalk.bold.red(
              "You have taken too much damage, you are too weak to go on!\n"
            )
          );
          break;
        }
      } else if (userChoice.choice === "2. Drink Health Portion") {
        if (playerHealthPortion >= 0) {
          playerHealth += healthPortionHealAmount;
          --playerHealthPortion;
          console.log(`
                You drink a health portion, healing yourself for ${chalk.green(
                  healthPortionHealAmount
                )}
                You know have ${chalk.green(playerHealth)} HP.
                You now have ${chalk.green(
                  playerHealthPortion
                )} health potion left.
                `);
        } else {
          console.log(`
            ${chalk.cyanBright(
              "\t You have no health portion left! Defeat enemies for a chance to get one!\n"
            )}
            `);
        }
      } else if ("3. Run!") {
        arrivedEnemyHP = 0;
        runningAwayFromBattle = true;
        console.log(`You ran away from the ${chalk.redBright(arrivedEnemy)}.`);
        break;
      }

      console.log("\n");
    }

    if (runningAwayFromBattle === true) {
      continue;
    } else if (arrivedEnemyHP < 1 && playerHealth > 1) {
      console.log(`# ${chalk.redBright(arrivedEnemy)} was defeated! #`);
      console.log(`# You have ${chalk.green(playerHealth)} HP left. #\n`);
      if (
        Math.floor(Math.random() * (100 - 1 + 1) + 1) > healthPortionDropChance
      ) {
        ++playerHealthPortion;
        console.log(
          `# The ${chalk.green(arrivedEnemy)} dropped a health potion! #`
        );
        console.log(
          `# You now have ${chalk.green(
            playerHealthPortion
          )} health potion(s). #\n`
        );
      }
      await inquirer
        .prompt([
          {
            type: "list",
            name: "restart",
            message: "What do you like to do now?",
            choices: ["Continue Fighting", "Exit Adventure Game"],
          },
        ])
        .then((answer) => {
          if (answer.restart === "Continue Fighting") {
            console.log(chalk.green("You continue on your adventure!"));
          } else {
            running = false;
          }
        });
    } else {
      console.log(
        chalk.red("You limp out of the adventure game, weak from battle.\n")
      );
      running = false;
    }
  }
}