const SubjectNavigation = ({ subjects, currentSubject, onSubjectChange }) => {
  return (
    <div className="space-y-2 mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onSubjectChange(subject)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            currentSubject === subject
              ? "bg-blue-100 text-blue-800 border-l-4 border-blue-600"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </button>
      ))}
    </div>
  );
};
export default SubjectNavigation;
