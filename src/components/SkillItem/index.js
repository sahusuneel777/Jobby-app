import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  return (
    <li className="skill-item" key={skillDetails.name}>
      <img
        src={skillDetails.skillImage}
        alt={skillDetails.name}
        className="skill-image"
      />
      <p className="skill-head">{skillDetails.name}</p>
    </li>
  )
}

export default SkillItem
