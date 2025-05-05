import { MetaFunction } from "@remix-run/react";
import PageHeader from "~/components/nav/PageHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - The Viking Experience" },
    { name: "description", content: "Saga Farmann follow the Vikings" },
  ];
};

export default function Vikingshow() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="The Viking Experience"
        imageUrl="https://imagedelivery.net/e_3VuGz-LipwAoEjnfBy7Q/b22efa3a-f63d-4e67-a329-538aa8a49400/1080p"
      />

      <div className="max-w-screen-lg mx-auto space-y-12 mb-24">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-foreground">
            The Viking ship Saga Farmann embarked on an epic adventure in 2023 to explore the peoples and cultures of Europe and to rediscover the ancient Viking connections along the historic trade routes.
          </p>

          <p className="text-base leading-relaxed text-foreground">
            Over the years of sailing, the crew of Saga Farmann has encountered remarkable hospitality and gained a much deeper understanding of the history of the countries once visited by the Vikings. In almost every port, the ship and her crew have been warmly welcomed, with great interest shown in both the vessel and the rich history of the Viking age.
          </p>

          <p className="text-base leading-relaxed text-foreground">
            To make any visit even more memorable, The Viking Experience show can be arranged in your town upon our arrival.
          </p>

          <p className="text-base leading-relaxed text-foreground">
            If you, or someone you know, might be interested in hosting the show, please contact us at{" "}
            <a
              href="mailto:contact@sagafarmann.com"
              className="font-medium underline text-primary"
            >
              contact@sagafarmann.com
            </a>{" "} — together we can make wonderful things happen.
          </p>

          {/* <p className="text-base leading-relaxed text-foreground">
              If you have already been in touch and made arrangements, please find all the details you need to get started by clicking the button below.
            </p> */}
        </div>
      </div>
    </div>
  );
}
