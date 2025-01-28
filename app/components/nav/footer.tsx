import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Link } from "@remix-run/react";
import { Mail, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground border-t border-border py-8">
      <div className="container px-4 lg:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold mb-2">Saga Farmann</h2>
            <p className="text-sm text-muted-foreground">
              Embark on an unforgettable journey with Saga Farmann. Explore the world, discover new horizons, and make memories that last a lifetime.
            </p>
            <Link
              to="https://www.paypal.com/donate/?hosted_button_id=2EAXYY2GZBJMY"
              target="_blank"
              rel="noopener noreferrer"
              prefetch="intent"
              aria-label="Donate to Saga Farmann"
              className="mt-4"
            >
              <Button className="w-32 h-9">
                Donate
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <nav className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Link to="/sponsors" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200">
                  Sponsors
                </Link>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200">
                  About Us
                </Link>
                <Link to="/crew" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200">
                  Info
                </Link>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200">
                  Join Us
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex items-start text-muted-foreground space-x-2">
              <MapPin className="w-4 h-4" />
              <p className="text-sm">Vikingodden Ollebukta 3, 3126 Tønsberg</p>
            </div>
            <div className="flex items-start text-muted-foreground space-x-2 mt-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@sagafarmann.com" className="hover:underline text-sm">
                contact@sagafarmann.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 my-4">
          <Link
            to="https://www.facebook.com/VikingskipetSagaFarmann"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition duration-300"
          >
            <SiFacebook className="w-6 h-6" />
          </Link>
          <Link
            to="https://www.instagram.com/original_vikings_of_norway/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition duration-300"
          >
            <SiInstagram className="w-6 h-6" />
          </Link>
          <Link
            to="https://www.youtube.com/channel/UCaPUAvRBw0i5ET79TMh2_MQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition duration-300"
          >
            <SiYoutube className="w-6 h-6" />
          </Link>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saga Farmann. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made by{" "}
            <a
              href="https://robertarnorsson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-foreground/80"
            >
              Robert Arnorsson
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
