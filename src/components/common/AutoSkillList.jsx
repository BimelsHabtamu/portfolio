import "./AutoSkillList.css";

const skills = [
  "PHP",
  "Laravel",
  "React.js",
  "JavaScript",
  "Python",
  "MySQL",
  "Tailwind CSS",
  "Git & GitHub",
  "AI Integration",
];

function AutoSkillList() {
  return (
    <div className="auto-skills">
      <div className="auto-skills__label">
        <span className="auto-skills__dot" />
        Technical Skills
      </div>

      <div className="auto-skills__window">
        <div className="auto-skills__track">
          {[...skills, skills[0]].map((skill, index) => (
            <div className="auto-skills__item" key={`${skill}-${index}`}>
              <span className="auto-skills__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoSkillList;
