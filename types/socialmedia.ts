
export type socialMediaPost = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
};

export type SocialMedia = {
  id: number;
  title: string;
  image?: string;
  video?: string;
  url?: string;
  hiddenOnMobile: boolean;
};