import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = () => (
  <>
    <ul className="types-of-employment">
      {employmentTypesList.map(eachEmployeeType => (
        <li className="employment-type-input-item">
          <input type="checkbox" id={eachEmployeeType.employmentTypeId} />
          <label
            className="employee-type-label"
            htmlFor={eachEmployeeType.employmentTypeId}
            // onClick={this.onClickFilterEmploymentType}
          >
            {eachEmployeeType.label}
          </label>
        </li>
      ))}
    </ul>
    <hr className="horizontal-line" />
    <ul className="types-of-employment">
      {salaryRangesList.map(eachSalaryRange => (
        <li className="employment-type-input-item">
          <input type="checkbox" id={eachSalaryRange.salaryRangeId} />
          <label
            className="employee-type-label"
            htmlFor={eachSalaryRange.salaryRangeId}
          >
            {eachSalaryRange.label}
          </label>
        </li>
      ))}
    </ul>
  </>
)

export default FiltersGroup
