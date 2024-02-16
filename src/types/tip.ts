// Details zu Tips

export type TipPost = {
  id: number;
  attributes: {
    tip_name: string;
    publishedAt: string;
    tip_text: string;
    uuid: string;
    slug: string;
    tipImage: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width: number;
          height: number;
          formats: {
            large: { url: string; width: number; heigth: number };
            medium: { url: string; width: number; heigth: number };
            small: { url: string; width: number; heigth: number };
            thumbnail: { url: string; width: number; heigth: number };
          };
        };
      };
    };
  };
};

export type Tip = {
  data: TipPost[];
};