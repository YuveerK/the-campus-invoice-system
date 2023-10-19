import { db } from "./index";

const complexesData = [
  {
    complexName: "Princeton",
    contact: {
      name: "Yuveer",
      email: "yuveerkal@hotmail.com",
    },
  },
  {
    complexName: "UCLA",
    contact: {
      name: "Tokelo",
      email: "tokelon@gmail.com",
    },
  },
  {
    complexName: "Cambridge",
    contact: {
      name: "Ninzi",
      email: "zzt.nana@gmail.com",
    },
  },
  {
    complexName: "Stanford",
    contact: {
      name: "Thembi",
      email: "zkkhumalo@gmail.com",
    },
  },
  {
    complexName: "Yale",
    contact: {
      name: "Shy",
      email: "shykutlwano@gmail.com",
    },
  },
  {
    complexName: "NYU",
    contact: {
      name: "Jackie",
      email: "jackie.krog@gmail.com",
    },
  },
  {
    complexName: "Harvard",
    contact: {
      name: "Kevin",
      email: "kevin12v2@gmail.com",
    },
  },
  {
    complexName: "Oxford",
    contact: {
      name: "Warren",
      email: "warrengst@gmail.com",
    },
  },
];

const addComplexesToFirestore = async () => {
  const complexesRef = db.collection("complexes");

  for (const complex of complexesData) {
    try {
      await complexesRef.add(complex);
      console.log(`Added complex: ${complex.complexName}`);
    } catch (error) {
      console.error(`Error adding complex ${complex.complexName}:`, error);
    }
  }
};

// Call the function to initiate the addition
addComplexesToFirestore();
