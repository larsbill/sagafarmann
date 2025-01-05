import { Link, MetaFunction } from "@remix-run/react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Thank You" },
    { name: "description", content: "Thank you for your interest in Saga Farmann - Follow the Vikings." },
  ];
};

export default function Thanks() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center gap-8 p-6">
      <h1 className="text-6xl font-bold text-primary">Thank You!</h1>
      <p className="text-lg text-center max-w-lg">
        We appreciate your intrest in joining the Saga Farmann crew. Shortly you will be contacted for further information. <br />
      </p>
      <p><strong>Follow us</strong> on sosial media to stay up to date!</p>
      <div className="flex flex-row items-center justify-center gap-8 group">
        <Link
          to="https://www.facebook.com/VikingskipetSagaFarmann"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition duration-300 md:hover:-translate-y-1 md:hover:scale-110"
        >
          <SiFacebook className="w-8 h-8" />
        </Link>
        <Link
          to="https://www.instagram.com/original_vikings_of_norway/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition duration-300 md:hover:-translate-y-1 md:hover:scale-110"
        >
          <SiInstagram className="w-8 h-8" />
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCaPUAvRBw0i5ET79TMh2_MQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition duration-300 md:hover:-translate-y-1 md:hover:scale-110"
        >
          <SiYoutube className="w-8 h-8" />
        </Link>
      </div>
      <a href="/">
        <Button size='lg'>Go back</Button>
      </a>
    </div>
  );
}
