// src/pages/Klu/PercentageCalculator/loadsubjects.jsx


export const SUBJECT_TEMPLATES = [
  {
    id: 0,
    subject: "Sample",
    components: [
      { name: "Component 1", weight: 40, max: 20 },
      { name: "Component 2", weight: 60, max: 20 },
    ]
  },
];

/**
 * Returns a full subject template object based on the ID.
 * @param {number} id - ID of the subject to load.
 * @returns {object|null} - Template object or null if not found.
 */
export const getSubjectTemplateById = (id) => {
  return (
    SUBJECT_TEMPLATES.find((subj) => subj.id === id) || null
  );
};


// Function to add a new subject with components passed as arrays
export function addSubjectTemplate(subjectName, ...components) {
  // Generate new ID
  const newId = SUBJECT_TEMPLATES.length > 0 
    ? Math.max(...SUBJECT_TEMPLATES.map(s => s.id)) + 1 
    : 0;

  // Convert input arrays to JSON objects
  const formattedComponents = components.map(comp => {
    if (!Array.isArray(comp) || comp.length !== 3) {
      throw new Error("Each component must be an array of [name(string), weight(number), max(number)]");
    }
    const [name, weight, max] = comp;
    return { name, weight, max };
  });

  // Create new subject object
  const newSubject = {
    id: newId,
    subject: subjectName,
    components: formattedComponents
  };

  // Append to the main array
  // SUBJECT_TEMPLATES.push(newSubject);
  SUBJECT_TEMPLATES.unshift(newSubject);
}



// Adding predefined subjects using the function
// Adding predefined subjects using the function
// Adding predefined subjects using the function


addSubjectTemplate("Applied Machine Learning for Text Analysis - A Mode",
  ["Skill Sem-End Exam", 8, 50],
  ["Lab End Semester Exam", 8, 50],
  ["End Semester Exam", 24, 100],
  ["Skilling Continuous Evaluation", 5, 120],
  ["Continuous Evaluation - Lab Exercise", 5, 120],
  ["Home Assignment and Textbook", 7, 100],
  ["ALM", 7, 100],
  ["Skill In-Sem Exam", 6, 50],
  ["Lab In Semester Exam", 6, 50],
  ["Semester in Exam-II", 9, 50],
  ["Surpize Quiz", 6, 25],
  ["Semester in Exam-I", 9, 50]
);


addSubjectTemplate("Compiler Design",
  ["Lab End Semester Exam", 16, 100],
  ["End Semester Exam", 24, 25],
  ["Continuous Evaluation - Lab Exercise", 10, 25],
  ["Home Assignment and Textbook", 6, 50],
  ["ALM", 8, 50],
  ["Lab In Semester Exam", 8, 50],
  ["Semester in Exam-II", 14, 50],
  ["Semester in Exam-I", 14, 50]
);


addSubjectTemplate("Adaptive Software Engineering",
  ["End Semester Exam", 40, 100],
  ["Home Assignment and Textbook", 5, 40],
  ["Tutorial", 15, 100],
  ["ALM", 6, 100],
  ["Semester in Exam-II", 17, 50],
  ["Semester in Exam-I", 17, 50]
);


addSubjectTemplate("Advanced Algorithms and Data Structures",
  ["Lab End Semester Exam", 16, 50],
  ["End Semester Exam", 24, 100],
  ["MOOCs Review", 6, 100],
  ["Continuous Evaluation - Lab Exercise", 6, 50],
  ["Home Assignment and Textbook", 6, 100],
  ["ALM", 6, 100],
  ["Lab In Semester Exam", 8, 50],
  ["Semester in Exam-II", 14, 50],
  ["Semester in Exam-I", 14, 50]
);


addSubjectTemplate("Distributed Computing",
  ["End Semester Exam", 40, 100],
  ["Home Assignment and Textbook", 10, 40],
  ["ALM", 15, 40],
  ["Semester in Exam-II", 17.5, 50],
  ["Semester in Exam-I", 17.5, 50]
);


addSubjectTemplate("Theory Of Computation",
  ["End Semester Exam", 40, 100],
  ["Home Assignment and Textbook", 7, 40],
  ["Tutorial", 10, 40],
  ["ALM", 7, 40],
  ["Semester in Exam-II", 18, 50],
  ["Semester in Exam-I", 18, 50]
);
