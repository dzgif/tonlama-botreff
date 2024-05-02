import axios from "axios";
import color from "picocolors";
import { intro, text, isCancel, cancel, spinner } from "@clack/prompts";

function generateRandomCode() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const randomAlphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomAlphabet2 = String.fromCharCode(65 + Math.floor(Math.random() * 26)).toLowerCase();

  return `${randomAlphabet2}${randomAlphabet2}${randomNumber}${randomAlphabet}${randomAlphabet2}${randomAlphabet}`;
}

function generateFakeReff(lastDigit) {
  let fakeAddress = `0:${generateRandomCode()}66bee3d7add0f366120e811e7b55433706c62cd4531333656000000`;
  return fakeAddress.substring(0, fakeAddress.length - 6) + lastDigit.padStart(6, "0");
}

async function main() {
  intro(color.inverse(" tonlama-auto-reff "));
  intro(color.inverse(" by @dzgif "));

  const mainRefferal = await text({
    message: "Input your reff code tonlama",
    placeholder: "Example: 0:w3SgebElo....",
  });

  if (isCancel(mainRefferal)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  try {
    const refferalProgress = spinner();
    for (let i = 0; i <= 999999; i++) {
      let lastDigits = i.toString();
      let address = generateFakeReff(lastDigits);

      let data = JSON.stringify({
        address: address,
        refby: mainRefferal,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://lama-backend-qd2o.onrender.com/user",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          refferalProgress.start(`Success add refferal count:${i + 1} | with address ${response.data.user.address}`);
        })
        .catch((error) => {
          console.log(error);
        });

      const delay = Math.floor(Math.random() * 6 + 5) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}

main().catch(console.error);
