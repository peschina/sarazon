const { getRandomDate } = require("./utils");

module.exports = [
  {
    name: "False Lash Effect Mascara",
    price: 10,
    description:
      "The peculiar shape of the brush delivers dramatic volume and sculpted length. This mascara defines and separates lashes while achieving a bold look!",
    numberInStock: 40,
    insertionDate: getRandomDate()
  },
  {
    name: "hair Dryer",
    price: 45,
    description:
      "Professional Salon Hair Dryer with advanced ions generator built in. Our breakthrough is to use turbo to speed up transferring ten times more ions and thus help removing static and reducing frizz. The combined effect of ceramic tourmaline makes hair soft and smooth, and all you have to do is blow-dry it!",
    numberInStock: 10,
    insertionDate: getRandomDate()
  },
  {
    name: "Nail Clipper",
    price: 5,
    description:
      "Professional Stainless Steel Nail Clippers. This Nail Clipper has a comfortable ergonomic shape that meets the natural curve of nails. It makes each clip smooth and easier, no mattery your nail type",
    numberInStock: 50,
    insertionDate: getRandomDate()
  },
  {
    name: "Epilator",
    price: 229,
    description:
      "This epilator reveals and removes even the finest hairs that other epilators don't show. The 20-tweezer system removes hairs at the root, leaving your skin smooth for weeks. Raccomended for body and legs.",
    numberInStock: 8,
    insertionDate: getRandomDate()
  },
  {
    name: "Razor",
    price: 3,
    description:
      "A great shave is within your grasp with this Gillette Men's Razor. Featuring two thin twin blades to provide a comfortable shave for anyone.",
    numberInStock: 50,
    insertionDate: getRandomDate()
  },
  {
    name: "I'm Fabulous Body Oil",
    price: 12,
    description:
      "I'm Fabulous Body Oil is a 100% natural oil that’s perfect for nourishing and reviving any skin type. This oil is easily absorbed and won’t clog pores, promoting clear, soft, healthy-looking skin. This skin-nourishing oil is ideal for the entire body!",
    numberInStock: 15,
    insertionDate: getRandomDate()
  }
];
