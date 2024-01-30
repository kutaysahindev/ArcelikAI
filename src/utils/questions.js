//This file will be deprecated and questions will be fetched from the DB
export const questions = [
  {
    Id: 1,
    questionType: "ss",
    question: "How old was Nicola Tesla when he died?",
    options: [
      {
        oID: 1,
        option: "96",
      },
      {
        oID: 2,
        option: "46",
      },
      {
        oID: 3,
        option: "36",
      },
      {
        oID: 4,
        option: "86",
      },
    ],
    time: 20,
    points: 20,
  },
  {
    Id: 2,
    questionType: "ms",
    question: "Which gadgets below did Nicola Tesla invent?",
    options: [
      {
        oID: 1,
        option: "Tesla Coil",
      },
      {
        oID: 2,
        option: "Induction Motor",
      },
      {
        oID: 3,
        option: "Radio",
      },
      {
        oID: 4,
        option: "Ammeter",
      },
      {
        oID: 5,
        option: "Neon Lamp",
      },
    ],
    time: 30,
    points: 30,
  },
  {
    Id: 3,
    questionType: "das",
    question: "Sort these scientists by their date of birth.",
    options: [
      {
        oID: 1,
        option: "Alexander Graham Bell",
      },
      {
        oID: 2,
        option: "Thomas Edison",
      },
      {
        oID: 3,
        option: "Max Planck",
      },
      {
        oID: 4,
        option: "Albert Einstein",
      },
      {
        oID: 5,
        option: "Niels Bohr",
      },
      {
        oID: 6,
        option: "Wilhelm Roentgen",
      },
      {
        oID: 7,
        option: "Nikola Tesla",
      },
    ],
    time: 40,
    points: 50,
  },
  {
    Id: 4,
    questionType: "oe",
    question: "Where was Nikola Tesla born? (country)",
    time: 20,
    points: 20,
  },
  {
    Id: 5,
    questionType: "tof",
    question: "Did Nikola Tesla ever get married?",
    time: 15,
    points: 10,
  },
];
